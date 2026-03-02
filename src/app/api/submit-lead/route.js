import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// --- Rate Limiting (in-memory) ---
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX = 5;

function checkRateLimit(ip) {
  const now = Date.now();

  for (const [key, entry] of rateLimitMap) {
    if (now - entry.firstRequest > RATE_LIMIT_WINDOW) {
      rateLimitMap.delete(key);
    }
  }

  const entry = rateLimitMap.get(ip);

  if (!entry) {
    rateLimitMap.set(ip, { count: 1, firstRequest: now });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) return false;

  entry.count++;
  return true;
}

function saveLead(entry) {
  const logDir = path.join(process.cwd(), "leads");
  const logFile = path.join(logDir, "leads.json");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(logFile, JSON.stringify(entry) + "\n", "utf8");
}

export async function POST(request) {
  try {
    // --- Origin Check ---
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (!origin) {
      return NextResponse.json(
        { success: false, message: "Unauthorized request." },
        { status: 403 }
      );
    }

    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return NextResponse.json(
          { success: false, message: "Unauthorized request." },
          { status: 403 }
        );
      }
    } catch {
      return NextResponse.json(
        { success: false, message: "Unauthorized request." },
        { status: 403 }
      );
    }

    // --- Rate Limiting ---
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests. Please try again later." },
        { status: 429 }
      );
    }

    const body = await request.json();

    const {
      parentName,
      childName,
      grade,
      mobile,
      email,
      message,
      variant,
      honeypot,
    } = body;

    // --- Honeypot Check ---
    if (honeypot) {
      return NextResponse.json({
        success: true,
        message: "submitted successfully!",
      });
    }

    // ---------- VALIDATION ----------
    if (variant === "contact") {
      if (!parentName || !mobile || !email || !message) {
        return NextResponse.json(
          { success: false, message: "Required fields missing" },
          { status: 400 }
        );
      }
    } else {
      if (!parentName || !childName || !mobile || !email) {
        return NextResponse.json(
          { success: false, message: "Required fields missing" },
          { status: 400 }
        );
      }
    }

    // --- CRM Submission ---
    const ACCESS_CODE =
      process.env.SCALEDINO_ACCESS_CODE || "C814-C612-A9C4-8F9B-72ED-BBBD";

    const API_ENDPOINT =
      process.env.SCALEDINO_API_URL ||
      "https://leadapi.yellowslate.com/api/webhooks/web/client";

    const crmPayload = {
      access_code: ACCESS_CODE,
      name: parentName,
      email,
      phone: mobile,
      grade: grade || "",
      parent_name: parentName || "",
      student_name: childName || "",
      message: message || "",
      source: variant === "contact" ? "Website Contact" : "Website Enquiry",
    };

    let crmResponseBody = null;
    let crmStatusCode = 0;
    let crmSuccess = false;

    try {
      const crmRes = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(crmPayload),
      });

      crmStatusCode = crmRes.status;

      const text = await crmRes.text();

      try {
        crmResponseBody = JSON.parse(text);
      } catch {
        crmResponseBody = { raw: text };
      }

      crmSuccess = crmRes.ok;
    } catch (fetchError) {
      console.error("CRM ERROR:", fetchError);
      crmResponseBody = { error: fetchError.message };
      crmSuccess = false;
    }

    // --- Save Lead Locally (ALWAYS SAVE) ---
    try {
      saveLead({
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 8)}`,
        submittedAt: new Date().toISOString(),
        formData: {
          name: parentName,
          email,
          phone: mobile,
          grade: grade || "",
          parent_name: parentName || "",
          student_name: childName || "",
          message: message || "",
          source:
            variant === "contact"
              ? "Website Contact"
              : "Website Enquiry",
        },
        requestPayload: crmPayload,
        crmResponse: crmResponseBody,
        crmStatusCode,
        success: crmSuccess,
      });
    } catch (writeError) {
      console.error("FILE WRITE ERROR:", writeError);
    }

    // --- FINAL RESPONSE (NEVER FAIL USER BECAUSE OF CRM) ---
    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully!",
      crmStatus: crmSuccess ? "success" : "failed",
    });

  } catch (error) {
    console.error("Lead submission error:", error);

    return NextResponse.json(
      { success: false, message: "Something went wrong." },
      { status: 500 }
    );
  }
}