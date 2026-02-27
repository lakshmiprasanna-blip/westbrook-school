import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(request) {
  // --- Password Check ---
  const password = request.headers.get("x-leads-password");
  if (!password || password !== process.env.LEADS_PASSWORD) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  try {
    const logFile = path.join(process.cwd(), "leads", "leads.json");

    if (!fs.existsSync(logFile)) {
      return NextResponse.json({ leads: [], total: 0 });
    }

    const raw = fs.readFileSync(logFile, "utf8");
    const lines = raw.trim().split("\n").filter(Boolean);

    const leads = lines
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .reverse(); // newest first

    return NextResponse.json({ leads, total: leads.length });
  } catch (error) {
    console.error("Failed to read leads.json:", error);
    return NextResponse.json({ leads: [], total: 0 });
  }
}
