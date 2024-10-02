"use client";

import { useEffect, useState } from "react";
import Result from "./result/result";
import { useAppSelector } from "@/src/app/hooks";
import { divide, isEmpty } from "lodash";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import GroqInfo from "./groqInfo/groqInfo";

export default function GroqInterface() {
  const { items } = useAppSelector((state) => state.itemState);

  const [words, setWords] = useState<string[]>([]);
  const [result, setResult] = useState<{ message: string; answer: string }>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const titles = items.map((item) => item.title);
    setWords(titles);
  }, [items]);

  const writeAStoryWithGroq = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(words),
      });

      const responseResult = await response.json();
      setResult(responseResult);
    } catch (error) {
      setResult({
        message: "Error",
        answer: "something went wrong, please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isEmpty(words) && (
        <div className="flex flex-col my-4 justify-center items-center">
          <div className="flex flex-row gap-2 items-center justify-center">
            <GroqInfo />
            <button className="primaryBtn !w-fit" onClick={writeAStoryWithGroq}>
              Read a story containing your words
            </button>
          </div>

          {loading ? (
            <LoadingPulse />
          ) : result?.message === "Error" ? (
            <p className="text-red-500">{result.answer}</p>
          ) : (
            <Result answer={result!.answer} />
          )}
        </div>
      )}
    </div>
  );
}
