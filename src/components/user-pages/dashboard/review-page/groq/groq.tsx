"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { isEmpty } from "lodash";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import GroqInfo from "./groqInfo/groqInfo";
import wordsHighlighter from "./wordsHighlighter/wordsHighlighter";
import Story from "./story/story";
import { generatedStoryReducer } from "@/src/redux/slices/itemStateSlice";

export default function GroqInterface() {
  const { items, generatedStory } = useAppSelector((state) => state.itemState);
  const [words, setWords] = useState<string>('');
  const [wordsArray, setWordsArray] = useState<string[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    const wordsArray = items.map((item) => item.title)
    const words = wordsArray.join(",");
    setWordsArray(wordsArray)
    setWords(words);
  }, [items]);

  const writeAStoryWithGroq = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/groq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(words),
      });
      const responseStory = await response.json();
      const highlightedStory = wordsHighlighter(responseStory.answer, wordsArray);
      dispatch(generatedStoryReducer(highlightedStory));
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!isEmpty(wordsArray) && (
        <div className="flex flex-col justify-center items-center gap-2 mb-12">
          <div className="flex flex-row gap-2 items-center">
            <GroqInfo words={words} />
            <button
              title="Generate a story with your selected items"
              className="primaryBtn !m-0 !w-52"
              onClick={writeAStoryWithGroq}
            >
              Generate a story
            </button>
          </div>

          <div className="w-full">
            {loading ? (
              <LoadingPulse />
            ) : (
              <>
                {error && (
                  <p className="text-red-500">
                    Something went wrong, please check your connection!
                  </p>
                )}
                {generatedStory && <Story story={generatedStory} />}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
