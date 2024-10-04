import React, { useState } from "react";
import { isEmpty } from "lodash";
import { useAppDispatch } from "@/src/app/hooks";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import Dialog from "@/src/components/general/dialog/dialog";
import { wordListTypes } from "@/src/types/interface";

export default function WordList({ wordList }: { wordList: wordListTypes }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const [existingWordlist, setExistingWordlist] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const addWordHandler = (word: string) => {
    closeDialog();
    dispatch(formDataReducer({ title: word }));
  };
  const openListHandler = async (wordsArray: string[]) => {
    const lowerCaseWordsArray = wordsArray.map((word) => word.toLowerCase());
    
    try {
      const existingWordListInDB = await db.items
        .where("title")
        .anyOf(lowerCaseWordsArray)
        .toArray();
        console.log(existingWordListInDB);
        
      const existingWordsTitles = existingWordListInDB.map(
        (item) => item.title,
      );
      console.log(existingWordsTitles);
      
      setExistingWordlist(existingWordsTitles);
    } catch (error) {}
    openDialog();
  };
  return (
    <div className="m-2">
      {wordList.words.length !== existingWordlist.length && (
        <button
          onClick={() => openListHandler(wordList.words)}
          title="Show words"
          className="secondaryBtn"
        >
          11 plus
        </button>
      )}

      <Dialog isOpen={isDialogOpen} closeBtn closeDialogHandler={closeDialog}>
        {isEmpty(wordList) ? (
          <p>Loading words</p>
        ) : (
          <div>
            <div className="flex flex-row gap-2 my-4">
              <span>All:{wordList.words.length}</span>
              <span>Added: {existingWordlist.length}</span>
              <span>
                Left:{wordList.words.length - existingWordlist.length}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 w-full max-w-2xl max-h-80 overflow-y-auto">
              {wordList.words.map((word, i) => {
                const isAdded = existingWordlist!.includes(word.toLowerCase());
                return (
                  <div
                    key={i}
                    className={`${isAdded ? "bg-gray-400 opacity-30 cursor-not-allowed" : "bg-gray-200"}  cursor-default p-2 rounded-md w-fit flex flex-row gap-1 items-center`}
                  >
                    <span>{word}</span>
                    {!isAdded && (
                      <button
                        onClick={() => addWordHandler(word)}
                        className="greenBtn !w-8 h-8 !pt-2 !text-3xl"
                      >
                        +
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
