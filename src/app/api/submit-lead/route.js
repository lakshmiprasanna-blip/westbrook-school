import { NextResponse } from "next/server";

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
    if (!parentName || !mobile || !email) {
      return NextResponse.json(
        { success: false, message: "Required fields missing" },
        { status: 400 }
      );
    }

    // ================= CRM CONFIG =================
    const ACCESS_CODE = process.env.CRM_ACCESS_CODE;

    if (!ACCESS_CODE) {
      console.error("CRM_ACCESS_CODE not set in environment variables");
      return NextResponse.json(
        { success: false, message: "Server configuration error" },
        { status: 500 }
      );
    }

    const crmPayload = {
      access_code: ACCESS_CODE,
      name: parentName,
      email: email,
      phone: mobile,
      grade: grade || "",
      student_name: childName || "",
      message: message || "",
      source:
        variant === "contact"
          ? "Website Contact"
          : "Website Enquiry",
    };

    // ================= SEND TO CRM =================
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

    const responseText = await crmRes.text();
    console.log("CRM STATUS:", crmRes.status);
    console.log("CRM RESPONSE:", responseText);

    if (!crmRes.ok) {
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