import { NextResponse } from "next/server";
import clientPromise from "../../../lib/mongodb";

export async function GET(request) {
  const password = request.headers.get("x-leads-password");

  if (password !== process.env.LEADS_PASSWORD) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const client = await clientPromise;
  const db = client.db("leadsdb");

  const leads = await db
    .collection("leads")
    .find({})
    .sort({ submittedAt: -1 })
    .toArray();

  return NextResponse.json({
    leads,
    total: leads.length,
  });
}