import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import User from "@/utils/models/user";
import { getServerSession } from "next-auth";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  // const session = await getServerSession({
  //   cookies: cookies(),
  // });
  // if (!session) {
  //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // }
  try {
    await connectDB();
    const userCount = await User.countDocuments();
    return NextResponse.json({ count: userCount });
  } catch (error) {
    console.error("Failed to fetch user count:", error);
    return NextResponse.json(
      { error: "Failed to fetch user count" },
      { status: 500 },
    );
  }
}
