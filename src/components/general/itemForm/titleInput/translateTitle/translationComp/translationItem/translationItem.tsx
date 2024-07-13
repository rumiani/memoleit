import React, { useState } from "react";
import TextToSpeechSpeaker from "../../../../../textToSpeech/textToSpeech";
import LoadingPulse from "../../../../../loading-comps/loadingPulse/loadingPulse";
import { FaRegCopy } from "react-icons/fa";
import { MdMoveDown, MdOutlineTranslate } from "react-icons/md";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import {
  formDataReducer,
  translatingItemsReducer,
} from "@/src/redux/slices/itemStateSlice";
import { copyToClipboardHandler } from "@/src/handlers/general/copyToClipboard";
import { toast } from "react-toastify";
import { capitalize } from "lodash";
import { IoMdRemoveCircleOutline } from "react-icons/io";
export default function TranslationItem({
  translatingItem,
  setDialogOpen,
}: {
  translatingItem: string;
  setDialogOpen: Function;
}) {
  const [lookUpResult, setLookUpResult] = useState("");
  const [lookingUp, setLookingUp] = useState<boolean>(false);
  const [notFount, setNotFount] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { textToSpeechLang } = useAppSelector((state) => state.settingState);
  const { translatingItems } = useAppSelector((state) => state.itemState);

  const lookUpHandler = async (word: string) => {
    setLookingUp(true);
    setNotFount(false);
    const lang = textToSpeechLang.split("-")[0];
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`,
      );
      if (response.status === 404) {
        setLookingUp(false);
        return setNotFount(true);
      }
      if (!response.ok) {
        setLookingUp(false);
        return toast.error("Please check out your connection.");
      }
      const lookUpResult = await response.json();
      const definition = lookUpResult[0].meanings[0].definitions[0].definition;
      setLookUpResult(definition);
      setLookingUp(false);
    } catch (error: any) {
      console.log("error");
    }
  };
  return (
    <div className="w-72 p-2  shadow-md shadow-gray-300">
      <div className="flex flex-row justify-between gap-2 items-center">
        <p className="font-bold">{capitalize(translatingItem)}</p>
        <div className="flex flex-row gap-1">
          <button
            type="button"
            onClick={() => {
              lookUpHandler(translatingItem);
              setDialogOpen(true);
            }}
            className=" icon text-2xl"
          >
            <MdOutlineTranslate />
          </button>
          <TextToSpeechSpeaker text={translatingItem} />
          {translatingItems.length > 1 && (
            <IoMdRemoveCircleOutline
              onClick={() =>
                dispatch(
                  translatingItemsReducer(
                    translatingItems.filter((item) => item !== translatingItem),
                  ),
                )
              }
              className="icon text-red-500"
            />
          )}
        </div>
      </div>
      {lookingUp ? (
        <div className="w-full">
          <LoadingPulse />
        </div>
      ) : (
        <div className="flex w-full flex-row gap-2 items-center">
          {notFount ? (
            <p className="text-red-500 mx-auto"> Not Fount</p>
          ) : (
            lookUpResult && (
              <div className="flex flex-row gap-2 justify-between w-full ">
                <div className="w-full">{lookUpResult}</div>
                <div className="flex flex-col justify-around w-10 h-32 mx-auto gap-2">
                  <FaRegCopy
                    onClick={() => copyToClipboardHandler(lookUpResult)}
                    title="Copy to clipboard"
                    className="icon !p-2 hover:scale-110 cursor-pointer"
                  />
                  <TextToSpeechSpeaker text={lookUpResult} />
                  <MdMoveDown
                    title="Move it to the description."
                    onClick={() => {
                      setDialogOpen(false);
                      dispatch(
                        formDataReducer({
                          title: translatingItem,
                          body: lookUpResult,
                        }),
                      );
                    }}
                    className="icon !p-2 hover:scale-110 cursor-pointer"
                  />
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
