import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { elevenPlus } from "@/src/data/words/11plus";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ words: elevenPlus });
  } catch (error) {
    console.error("Failed to fetch 11 plus:", error);
    return NextResponse.json(
      { error: "Failed to fetch 11plus" },
      { status: 500 },
    );
  }
}
