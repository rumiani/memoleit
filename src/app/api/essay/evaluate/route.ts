import { authOptions } from "@/lib/auth/authOptions";
import groqEssayEvaluator from "@/lib/groqEssayEvaluator/groqEssayEvaluator";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { essay } = await req.json();
    const evaluation = await groqEssayEvaluator(essay);
    const essayObject = {
      id: uuidv4(),
      user: session?.user?.email!,
      topic: essay.topic,
      task: essay.task,
      body: essay.body,
      type: essay.type,
      properties: evaluation.properties,
      suggestions: evaluation.suggestions,
      score: evaluation.score,
      isRelatedToTopic: evaluation.isRelatedToTopic,
      createdAt: Date.now(),
    };
    return NextResponse.json(
      {
        message: "Essay result generated successfully/",
        essayObject,
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
