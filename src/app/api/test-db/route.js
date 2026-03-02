// app/api/test-db/route.js
import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("leadsdb");
  const count = await db.collection("leads").countDocuments();
  return NextResponse.json({ connected: true, count });
}