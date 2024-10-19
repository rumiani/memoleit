import { authOptions } from "@/lib/auth/authOptions";
import groqEssayEvaluator from "@/lib/groqEssayEvaluator/groqEssayEvaluator";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { essay } = await req.json();
    const evaluation = await groqEssayEvaluator(essay);
    return NextResponse.json(
      {
        message: "Essay result generated successfully/",
        essay: { essay, evaluation },
      },
      { status: 201 },
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: "Failed to generate an essay result." },
      { status: 500 },
    );
  }
}
