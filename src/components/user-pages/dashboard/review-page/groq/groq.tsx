"use client";

import { useEffect, useState } from "react";
import Result from "./result/result";
import { useAppSelector } from "@/src/app/hooks";
import { divide, isEmpty } from "lodash";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import GroqInfo from "./groqInfo/groqInfo";
import wordsHighlighter from "./wordsHighlighter/wordsHighlighter";

export default function GroqInterface() {
  const { items } = useAppSelector((state) => state.itemState);

  const [words, setWords] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const titles = items.map((item) => item.title);
    setWords(titles);
  }, [items]);

  const writeAStoryWithGroq = async () => {
    setLoading(true);
    setError(false);
    setResult(null);
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(words),
      });
      const responseResult = await response.json();
      const highlightedResult = wordsHighlighter(responseResult.answer, words);
      setResult(highlightedResult);
    } catch (error) {
      setError(true);
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
              Read a story with your selected words
            </button>
          </div>

          {loading ? (
            <LoadingPulse />
          ) : (
            <div>
              {error && (
                <p className="text-red-500">
                  Something went wrong, please check your connection!
                </p>
              )}
              {result && <Result answer={result} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
