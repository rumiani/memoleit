"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { isEmpty } from "lodash";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import GroqInfo from "./storyInfo/storyInfo";
import wordsHighlighter from "./wordsHighlighter/wordsHighlighter";
import Story from "./story/story";
import { generatedStoryReducer } from "@/src/redux/slices/itemStateSlice";
import { storyTopics } from "@/src/data/story/storyTopics";

export default function GroqInterface() {
  const { items, generatedStory } = useAppSelector((state) => state.itemState);
  const [words, setWords] = useState<string>("");
  const [wordsArray, setWordsArray] = useState<string[]>([]);
  const [topic, setTopic] = useState<string>("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const wordsArray = items.map((item) => item.title);
    const words = wordsArray.join(", ");
    setWordsArray(wordsArray);
    setWords(words);
  }, [items]);

  const writeAStoryWithGroq = async () => {
    setLoading(true);
    setError(false);
    try {
      const response = await fetch("/api/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ words, topic }),
      });
      const responseStory = await response.json();
      const highlightedStory = wordsHighlighter(
        responseStory.answer,
        wordsArray,
      );
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
          <strong>Generate a story with your words</strong>
          <div className="flex flex-col gap-2 items-center">
            <select
              className="w-42 p-2 border border-gray-100 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
              id="categories"
              value={topic}
              onChange={(e: any) => setTopic(e.target.value)}
            >
              <option key={topic} value="">
                ------- Select a topic -------
              </option>
              {storyTopics.map((topic) => {
                return (
                  <option key={topic} value={topic}>
                    {topic}
                  </option>
                );
              })}
            </select>
            <div className="flex flex-row items-center justify-between w-full">
              <GroqInfo words={words} />
              <button
                disabled={topic === ""}
                title="Generate a story with your selected items"
                className="primaryBtn disabled:opacity-50 !m-0 !w-52"
                onClick={writeAStoryWithGroq}
              >
                Generate a story
              </button>
            </div>
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
