import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { MdOutlineTranslate } from "react-icons/md";
import Dialog from "../../../dialog/dialog";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import TextToSpeechSpeaker from "@/src/components/general/textToSpeech/textToSpeech";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import { MdMoveDown } from "react-icons/md";

export default function TranslateTitle() {
  const { title, body } = useAppSelector((state) => state.itemState.formData);
  const { textToSpeechLang } = useAppSelector((state) => state.settingState);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [lookUpResult, setLookUpResult] = useState("");
  const [lookingUp, setLookingUp] = useState<boolean>(false);
  const [notFount, setNotFount] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(lookUpResult);
      toast.success("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy text to clipboard");
    }
    setDialogOpen(false);
  };
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
    <>
      {title.trim().length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => {
              lookUpHandler(title);
              setDialogOpen(true);
            }}
            className="absolute top-1 right-2 text-3xl icon"
          >
            <MdOutlineTranslate />
          </button>
          <Dialog isOpen={isDialogOpen} onClose={() => setDialogOpen(false)}>
            <div className="min-w-72 p-2">
              <div className="flex flex-row gap-2 items-center">
                <TextToSpeechSpeaker text={title} />
                <p className="font-bold">{title}</p>
              </div>
              {lookingUp ? (
                <LoadingPulse />
              ) : (
                <div className="flex flex-row gap-2 items-center">
                  {notFount ? (
                    <p className="text-red-500 mx-auto"> Not Fount</p>
                  ) : (
                    <div className="flex flex-row gap-2 justify-between">
                      <div className="flex flex-row gap-2">{lookUpResult}</div>
                      <div className="flex flex-row gap-2">
                        <FaRegCopy
                          onClick={copyToClipboard}
                          title="Copy to clipboard"
                          className="icon !p-2 hover:scale-110 cursor-pointer"
                        />
                        <MdMoveDown
                          title="Move it to the description."
                          onClick={() => {
                            setDialogOpen(false);
                            dispatch(
                              formDataReducer({
                                body: body + " " + lookUpResult,
                              }),
                            );
                          }}
                          className="icon !p-2 hover:scale-110 cursor-pointer"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
