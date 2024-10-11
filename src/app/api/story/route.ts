import { authOptions } from "@/lib/auth/authOptions";
import storyPromptHandler from "@/src/data/story/storyPrompt";
import Groq from "groq-sdk";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { words, topic } = await req.json();

    const prompt = storyPromptHandler(words, topic);
    const chatCompletion = await getGroqChatCompletion(prompt);
    const answer = chatCompletion.choices[0]?.message?.content || "";

    return NextResponse.json(
      { message: "Story generated successfully.", answer },
      { status: 201 },
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to generate a story." },
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
