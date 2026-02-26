import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const password = request.headers.get("x-leads-password");

    if (!password || password !== process.env.LEADS_PASSWORD) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Since Vercel is serverless and does not support filesystem storage,
    // we are not reading from leads.log anymore.

    return NextResponse.json({
      message: "File-based lead storage is disabled in production.",
      leads: [],
      total: 0,
    });
  } catch (error) {
    console.error("GET route error:", error);

    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}