import { authOptions } from "@/lib/auth/authOptions";
import { essayPrompt } from "@/src/data/essay/essayPrompt";
import topicPrompt from "@/src/data/essay/essaytopicPrompt";
import Groq from "groq-sdk";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { essay } = await req.json();
    
    const prompt = topicPrompt(essay);
    console.log(topicPrompt);
    
    const chatCompletion = await getGroqChatCompletion(prompt);
    const answer = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json(
      { message: "Essay result generated successfully/", answer },
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

const getGroqChatCompletion = (data: string) => {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: data,
      },
    ],
    model: "llama3-8b-8192",
  });
};
