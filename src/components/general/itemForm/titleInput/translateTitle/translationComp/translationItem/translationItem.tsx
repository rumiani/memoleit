import { useState } from "react";
import LoadingPulse from "../../../../../loading-comps/loadingPulse/loadingPulse";
import { toast } from "react-toastify";
import WordOptions from "./wordOptions/wordOptions";
import Results from "./results/results";
import { definitionOfItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";

export default function TranslationItem({
  translatingItem,
}: {
  translatingItem: string;
}) {
  const { translatingItems } = useAppSelector((state) => state.itemState);
  const [lookingUp, setLookingUp] = useState<boolean>(false);
  const [notFount, setNotFount] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);
  const [errorResult, setErrorResult] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const lookUpHandler = async (word: string) => {
    setLookingUp(true);
    setNotFount(false);
    setErrorResult(false);

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`,
      );
      if (response.status === 404) setNotFount(true);
      else if (!response.ok) {
        toast.error("Please check your connection.");
      } else {
        const lookUpResult = await response.json();
        dispatch(definitionOfItemsReducer({ [word]: lookUpResult }));
      }
    } catch (error: any) {
      setErrorResult(true);
    } finally {
      setLookingUp(false);
    }
  };
  return (
    <div className="p-2 shadow-md shadow-gray-300">
      <WordOptions
        translatingItem={translatingItem}
        lookUpHandler={lookUpHandler}
      />
      <div>
        <div className="text-red-500 text-center">
          {errorResult && "Please check your connection"}
        </div>
        {lookingUp ? (
          <LoadingPulse />
        ) : (
          <div className="flex flex-row gap-2 items-center">
            {notFount && <p className="text-red-500 mx-auto"> Not Found</p>}
            {translatingItems[translatingItem] && (
              <Results
                showMore={showMore}
                setShowMore={setShowMore}
                translatingItem={translatingItem}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
