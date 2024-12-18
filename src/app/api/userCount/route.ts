import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/dbConfig";
import User from "@/utils/models/user";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const isAdmin = session.user?.email === process.env.ADMIN;
    if (isAdmin) {
      await connectDB();
      const userCount = await User.countDocuments();
      return NextResponse.json({ count: userCount });
    }
    return NextResponse.json({ error: "Not admin" }, { status: 403 });
  } catch (error) {
    console.error("Failed to fetch user count:", error);
    return NextResponse.json(
      { error: "Failed to fetch user count" },
      { status: 500 },
    );
  }
}
