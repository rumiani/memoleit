import React, { useState } from "react";
import LoadingPulse from "../../../../../loading-comps/loadingPulse/loadingPulse";
import { toast } from "react-toastify";
import LookUpResults from "./longResults/longResults";
import { LookUpResultTypes } from "@/src/types/interface";
import WordOptions from "./wordOptions/wordOptions";
import ShortResult from "./shortResult/shortResult";
import LongResults from "./longResults/longResults";
import Results from "./results/results";
export default function TranslationItem({
  translatingItem,
  setDialogOpen,
}: {
  translatingItem: string;
  setDialogOpen: Function;
}) {
  const [lookUpResults, setLookUpResults] = useState<
    LookUpResultTypes[] | null
  >(null);
  const [lookingUp, setLookingUp] = useState<boolean>(false);
  const [notFount, setNotFount] = useState<boolean>(false);
  const [showMore, setShowMore] = useState(false);

  const lookUpHandler = async (word: string) => {
    setLookingUp(true);
    setNotFount(false);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      if (response.status === 404) setNotFount(true);
      else if (!response.ok) {
        toast.error("Please check your connection.");
      } else {
        const lookUpResult = await response.json();
        setLookUpResults(lookUpResult);
        console.log(lookUpResult);
        
      }
    } catch (error) {
    } finally {
      setLookingUp(false);
    }
  };
  return (
    <div className="p-2  shadow-md shadow-gray-300">
      <WordOptions
        translatingItem={translatingItem}
        lookUpHandler={lookUpHandler}
      />
      <div>
        {lookingUp ? (
          <LoadingPulse />
        ) : (
          <div className=" flex w-full flex-row gap-2 items-center">
            {notFount && <p className="text-red-500 mx-auto"> Not Found</p>}
            {lookUpResults && (
              <Results
                showMore={showMore}
                setDialogOpen={setDialogOpen}
                setShowMore={setShowMore}
                lookUpResults={lookUpResults}
                translatingItem={translatingItem}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
