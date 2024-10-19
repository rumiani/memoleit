import ollama from "ollama";
import { authOptions } from "@/lib/auth/authOptions";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const { prompt } = await req.json();
    console.log(prompt);

    const answer = await llamaHandler(prompt);
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

const llamaHandler = async (prompt: string) => {
  const response = await ollama.chat({
    model: "phi3",
    messages: [{ role: "user", content: prompt }],
  });
  return response.message.content;
};
