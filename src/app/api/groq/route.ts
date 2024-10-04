import { authOptions } from "@/lib/auth/authOptions";
import { storyPrompt } from "@/src/data/storyPrompt";
import Groq from "groq-sdk";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const wrodsArray = await req.json();
  const prompt = storyPrompt + wrodsArray;
  const chatCompletion = await getGroqChatCompletion(prompt);
  const answer = chatCompletion.choices[0]?.message?.content || "";

  try {
    return NextResponse.json(
      { message: "Post created successfully", answer },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { message: "Failed to create post" },
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
