// pages/api/search.ts
import { db } from "@/src/services/db";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextApiResponse) {
  const url = new URL(req.url!);
  const query = url.searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter is required" },
      { status: 400 },
    );
  }
  
  try {


    return NextResponse.json('Hellow');
  } catch (error) {
    console.log(error);
    
    return NextResponse.json(
      { error: "Failed to fetch data" },
      { status: 500 },
    );
  }
}
