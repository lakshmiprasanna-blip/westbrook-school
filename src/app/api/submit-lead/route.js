import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

/* ---------------- RATE LIMIT ---------------- */
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 10 * 60 * 1000; // 10 min
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

/* ---------------- POST ---------------- */
export async function POST(request) {
  try {
    /* ---- Origin Check ---- */
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");

    if (!origin || new URL(origin).host !== host) {
      return NextResponse.json(
        { success: false, message: "Unauthorized request." },
        { status: 403 }
      );
    }

    /* ---- Rate Limit ---- */
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0] ||
      request.headers.get("x-real-ip") ||
      "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, message: "Too many requests." },
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

    /* ---- Honeypot ---- */
    if (honeypot) {
      return NextResponse.json({ success: true });
    }

    /* ---- Validation ---- */
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

    /* ---- CRM Payload ---- */
    const crmPayload = {
      access_code: process.env.CRM_ACCESS_CODE,
      name: parentName,
      email,
      phone: mobile,
      grade: grade || "",
      parent_name: parentName || "",
      student_name: childName || "",
      message: message || "",
      source: variant === "contact" ? "Website Contact" : "Website Enquiry",
    };

    let crmSuccess = false;
    let crmStatusCode = 0;
    let crmResponse = null;

    try {
      const crmRes = await fetch(
        "https://leadapi.yellowslate.com/api/webhooks/web/client",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(crmPayload),
        }
      );

      crmStatusCode = crmRes.status;
      crmResponse = await crmRes.text();
      crmSuccess = crmRes.ok;
    } catch (err) {
      crmResponse = err.message;
    }

    /* ---- SAVE TO MONGODB (ALWAYS) ---- */
    const client = await clientPromise;
    const db = client.db("leadsdb");

    await db.collection("leads").insertOne({
      submittedAt: new Date(),
      success: crmSuccess,
      crmStatusCode,
      formData: {
        parent_name: parentName,
        child_name: childName || "",
        grade: grade || "",
        email,
        mobile,
        message: message || "",
        source: crmPayload.source,
      },
      requestPayload: crmPayload,
      crmResponse,
    });

    return NextResponse.json({
      success: true,
      crmStatus: crmSuccess ? "success" : "failed",
    });
  } catch (err) {
    console.error("Submit lead error:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}