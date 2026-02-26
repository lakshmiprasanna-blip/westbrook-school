import { NextResponse } from "next/server";
// export const runtime = "nodejs";
// import fs from "fs";
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

    const { parentName, childName, grade, mobile, email, message, variant } = body;

    if (!parentName || !mobile || !email) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    const ACCESS_CODE = "C814-C612-A9C4-8F9B-72ED-BBBD";

    const crmRes = await fetch(
      "https://leadapi.yellowslate.com/api/webhooks/web/client",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_code: ACCESS_CODE,
          name: parentName,
          email,
          phone: mobile,
          grade: grade || "",
          student_name: childName || "",
          message: message || "",
          source: variant === "contact"
            ? "Website Contact"
            : "Website Enquiry",
        }),
      }
    );

    if (!crmRes.ok) {
      console.error("CRM failed:", await crmRes.text());
      return NextResponse.json(
        { success: false, message: "CRM submission failed" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Lead submitted successfully!",
    });

  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
}