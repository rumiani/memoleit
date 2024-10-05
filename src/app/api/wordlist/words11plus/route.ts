import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { words11Plus } from "@/src/data/words/words11plus";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    return NextResponse.json({ words: words11Plus });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch 11plus" },
      { status: 500 },
    );
  }
}
