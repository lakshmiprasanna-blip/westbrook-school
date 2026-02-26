import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  const password = request.headers.get("x-leads-password");

  if (!password || password !== process.env.LEADS_PASSWORD) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const logFile = path.join(process.cwd(), "leads", "leads.log");

    if (!fs.existsSync(logFile)) {
      return NextResponse.json({ leads: [], total: 0 });
    }

    const raw = fs.readFileSync(logFile, "utf8");

    const leads = raw
      .trim()
      .split("\n")
      .filter(Boolean)
      .map((line) => JSON.parse(line))
      .reverse();

    return NextResponse.json({
      leads,
      total: leads.length,
    });
  } catch (error) {
    return NextResponse.json({ leads: [], total: 0 });
  }
}