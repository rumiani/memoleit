import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { MdOutlineTranslate } from "react-icons/md";
import Dialog from "../../../dialog/dialog";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import TextToSpeechSpeaker from "@/src/components/general/textToSpeech/textToSpeech";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
export default function TranslateTitle() {
  const { title } = useAppSelector((state) => state.itemState.formData);
  const { textToSpeechLang } = useAppSelector((state) => state.settingState);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [data, setData] = useState("");
  const [lookingUp, setLookingUp] = useState<boolean>(false);
  const [notFount, setNotFount] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(data);
      toast.success("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy text to clipboard");
    }
  };
  const lookUpHandler = async (word: string) => {
    setLookingUp(true);
    const lang = textToSpeechLang.split("-")[0];
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${word}`
      );
      if (response.status === 404) {
        setLookingUp(false);
        return setNotFount(true);
      }
      if (!response.ok) {
        setLookingUp(false);
        return toast.error("Please check out your connection.");
      }
      const data = await response.json();
      const definition = data[0].meanings[0].definitions[0].definition;
      setData(definition);
      dispatch(formDataReducer({ body: definition }));
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
            <div className="p-4">
              <p className="font-bold">{title}</p>
              {lookingUp ? (
                <LoadingPulse />
              ) : (
                <div className="flex flex-row gap-4">
                  {notFount ? (
                    <p className="text-red-500"> Not Fount</p>
                  ) : (
                    <div className="flex flex-row gap-4">
                      <TextToSpeechSpeaker text={title} />
                      <span>{data}</span>
                    </div>
                  )}
                  <FaRegCopy
                    onClick={copyToClipboard}
                    className="hover:scale-110 cursor-pointer"
                  />
                </div>
              )}
            </div>
          </Dialog>
        </div>
      )}
    </>
  );
}
