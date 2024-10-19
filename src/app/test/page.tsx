"use client";
import React, { useEffect, useState } from "react";

export default function Page() {
  const [answer, setAnswer] = useState("");
  useEffect(() => {
    const llamaHandler = async () => {
      const response = await fetch("/api/ollama", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: "What are you?" }),
      });
      const responseStory = await response.json();
      console.log(responseStory.answer);
      
      setAnswer(responseStory.answer)
    };
    llamaHandler()
  },[]);

  return <div>Answer: {answer}</div>;
}
