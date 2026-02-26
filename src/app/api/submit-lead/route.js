import { NextResponse } from "next/server";
export const runtime = "nodejs";
import fs from "fs";
import path from "path";

// ================= SAVE LEAD LOCALLY =================
function saveLead(entry) {
  const logDir = path.join(process.cwd(), "leads");
  const logFile = path.join(logDir, "leads.log");

  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
  }

  fs.appendFileSync(logFile, JSON.stringify(entry) + "\n", "utf8");
}

// ================= POST HANDLER =================
export async function POST(request) {
  try {
    const body = await request.json();

    const {
      parentName,
      childName,
      grade,
      mobile,
      email,
      message,
      variant,
    } = body;

    // ================= VALIDATION =================
    if (variant === "contact") {
      // Contact form validation
      if (!parentName || !mobile || !email || !message) {
        return NextResponse.json(
          { success: false, message: "Required fields missing" },
          { status: 400 }
        );
      }
    } else {
      // Enquiry form validation (simple/detailed)
      if (!parentName || !childName || !mobile || !email) {
        return NextResponse.json(
          { success: false, message: "Required fields missing" },
          { status: 400 }
        );
      }
    }

    // ================= CRM CONFIG =================
    const ACCESS_CODE = "C814-C612-A9C4-8F9B-72ED-BBBD";

    const crmPayload = {
      access_code: ACCESS_CODE,

      // Required CRM fields
      name: parentName,
      email: email,
      phone: mobile,

      // Optional CRM fields
      grade: grade || "",
      parent_name: parentName || "",
      student_name: childName || "",
      message: message || "",
      source: variant === "contact" ? "Website Contact" : "Website Enquiry",
    };

    let crmResponseBody = null;
    let crmStatusCode = 0;
    let crmSuccess = false;

    // ================= SEND TO CRM =================
    try {
      const crmRes = await fetch(
        "https://leadapi.yellowslate.com/api/webhooks/web/client",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(crmPayload),
        }
      );

      crmStatusCode = crmRes.status;
      const text = await crmRes.text();

      try {
        crmResponseBody = JSON.parse(text);
      } catch {
        crmResponseBody = { raw: text };
      }

      crmSuccess = crmRes.ok;
    } catch (error) {
      crmResponseBody = { error: error.message };
    }

    // ================= SAVE LOCALLY =================
    saveLead({
      id: `${Date.now()}`,
      submittedAt: new Date().toISOString(),
      formVariant: variant || "unknown",
      formData: body,
      requestPayload: crmPayload,
      crmResponse: crmResponseBody,
      crmStatusCode,
      success: crmSuccess,
    });

    // ================= RESPONSE =================
    if (crmSuccess) {
      return NextResponse.json({
        success: true,
        message: "Lead submitted successfully!",
      });
    } else {
      return NextResponse.json(
        { success: false, message: "CRM submission failed" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Lead submission error:", error);

    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}