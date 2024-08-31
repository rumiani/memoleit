import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "@/lib/dbConfig";
import User from "@/utils/models/user";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
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
