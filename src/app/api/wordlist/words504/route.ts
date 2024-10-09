import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { words504 } from "@/src/data/words/words504";

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    return NextResponse.json({ words: words504 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch 504 words" },
      { status: 500 },
    );
  }
}
