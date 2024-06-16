import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import TextToSpeechSpeaker from "@/src/components/general/textToSpeech/textToSpeech";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";
import { MdOutlineTranslate } from "react-icons/md";
import { copyToClipboard } from "./handlers/copyToClipboard";

export default function Dictionary() {
  const { title, body } = useAppSelector((state) => state.itemState.formData);
  const { isTextToSpeechOn, textToSpeechLang } = useAppSelector(
    (state) => state.settingState
  );
  const [lookingUp, setLookingUp] = useState<boolean>(false);
  const [notFount, setNotFount] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const lookUpHandler = async () => {
    setLookingUp(true);
    const lang = textToSpeechLang.split("-")[0];
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/${lang}/${title}`
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
      dispatch(formDataReducer({ body: definition }));
      setLookingUp(false);
      setNotFount(false)
    } catch (error: any) {
      console.log("error");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row justify-between gap-2 items-center">
        <input
          type="text"
          dir="auto"
          className="first-element primaryInput !w-5/6 pr-8 !h-10"
          placeholder="Write a word here..."
          autoComplete="off"
          value={title}
          onChange={(event) =>
            dispatch(formDataReducer({ title: event.target.value }))
          }
        />
        <FaRegCopy
          onClick={() => copyToClipboard(title)}
          className="icon !p-2"
        />
        <MdOutlineTranslate onClick={lookUpHandler} className="icon !p-2" />
      </div>
      {lookingUp ? (
        <LoadingPulse />
      ) : (
        <div>
          {notFount ? (
            <p className="text-red-500">Nothing found.</p>
          ) : (
            <div>
              {body !== "" && (
                <div className="flex flex-col gap-2 my-2">
                  <div className="flex flex-row gap-4">
                    {isTextToSpeechOn && <TextToSpeechSpeaker text={title} />}
                    {title}
                  </div>
                  <span>{body}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
