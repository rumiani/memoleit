import React, { useState } from "react";
import { isEmpty } from "lodash";
import { useAppDispatch } from "@/src/app/hooks";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import Dialog from "@/src/components/general/dialog/dialog";
import { wordListTypes } from "@/src/types/interface";
import { title } from "process";

export default function WordList({ wordList }: { wordList: wordListTypes }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const [existingWordlist, setExistingWordlist] = useState<string[]>([]);
  const [remainedWords, setRemainedWords] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const addWordHandler = (word: string) => {
    closeDialog();
    dispatch(formDataReducer({ title: word }));
  };
  const openListHandler = async (wordsArray: string[]) => {
    const lowerCaseWordsArray = wordsArray.map((word) => word.toLowerCase());

    try {
      const existingWordListObject = await db.items
        .where("title")
        .anyOf(lowerCaseWordsArray)
        .toArray();
      const existingWordsTitles = existingWordListObject.map(
        (item) => item.title,
      );
      const restOfTheWords = wordList.words.filter(
        (title) => !existingWordsTitles.includes(title),
      );
      setExistingWordlist(existingWordsTitles);
      setRemainedWords(restOfTheWords);
    } catch (error) {}
    openDialog();
  };

  return (
    <div>
      {wordList.words.length !== existingWordlist.length && (
        <button
          onClick={() => openListHandler(wordList.words)}
          title="Show words"
          className="secondaryBtn"
        >
          {wordList.lable}
        </button>
      )}

      <Dialog isOpen={isDialogOpen} closeBtn closeDialogHandler={closeDialog}>
        {isEmpty(wordList) ? (
          <p>Loading words</p>
        ) : (
          <div>
            <strong>{wordList.lable}</strong>
            <div className="flex flex-row gap-2 my-4">
              <span>All:{wordList.words.length}</span>
              <span>Added: {existingWordlist.length}</span>
              <span>
                Left:{wordList.words.length - existingWordlist.length}
              </span>
            </div>

            <div className="max-h-80 overflow-y-auto ">
              <strong className="my-4">Remained words:</strong>
              <div className="flex flex-wrap gap-2 w-full max-w-2xl border-t border-gray-600 p-1">
                {remainedWords.map((word, i) => {
                  return (
                    <div
                      key={i}
                      title={"Click + to add the word"}
                      className="bg-gray-200 cursor-default p-2 rounded-md w-fit flex flex-row gap-1 items-center"
                    >
                      <span>{word}</span>
                      <button
                        onClick={() => addWordHandler(word)}
                        className="greenBtn !w-8 h-8 !pt-2 !text-3xl"
                      >
                        +
                      </button>
                    </div>
                  );
                })}
              </div>
              <strong className="my-4">Added words:</strong>
              <div className="flex flex-wrap gap-2 w-full max-w-2xl border-t border-gray-600 p-1">
                {existingWordlist.map((word, i) => {
                  return (
                    <div
                      key={i}
                      title={"This word is in the box"}
                      className="bg-gray-400 opacity-30 cursor-not-allowed p-2 rounded-md w-fit flex flex-row gap-1 items-center"
                    >
                      <span>{word}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
}
