import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import TextToSpeechSpeaker from "@/src/components/general/textToSpeech/textToSpeech";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa";
import { MdMoveDown, MdOutlineTranslate } from "react-icons/md";
import { copyToClipboard } from "./handlers/copyToClipboard";

export default function Dictionary() {
  const { title, body } = useAppSelector((state) => state.itemState.formData);
  const [lookUpResult, setLookUpResult] = useState<string>("");
  const [lookingUp, setLookingUp] = useState<boolean>(false);
  const [notFount, setNotFount] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const lookUpHandler = async () => {
    setLookingUp(true);
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${title}`,
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
      setLookUpResult(definition);
      setLookingUp(false);
      setNotFount(false);
    } catch (error: any) {
      console.log("error");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col sm:flex-row justify-between gap-2 items-center">
        <input
          type="text"
          dir="auto"
          className="first-element primaryInput w-full pr-8 !h-10"
          placeholder="Write a word here..."
          autoComplete="off"
          value={title}
          onChange={(event) => {
            console.log(title.length);
            dispatch(formDataReducer({ title: event.target.value }));
            if (title === "") setLookUpResult("");
          }}
        />
        {title.length > 0 && (
          <div className="w-full sm:w-1/2 flex flex-row justify-between gap-1">
            <FaRegCopy
              onClick={() => copyToClipboard(title)}
              className="icon !p-2"
            />
            <TextToSpeechSpeaker text={title} />
            <MdOutlineTranslate onClick={lookUpHandler} className="icon !p-2" />
          </div>
        )}
      </div>
      {title.length > 0 && (
        <div>
          {lookingUp ? (
            <LoadingPulse />
          ) : (
            <div>
              {notFount ? (
                <p className="text-red-500">Nothing found.</p>
              ) : (
                <div>
                  {lookUpResult !== "" && (
                    <div className="w-full flex flex-row gap-1 items-center justify-between">
                      <div>{lookUpResult}</div>
                      <FaRegCopy
                        onClick={() => copyToClipboard(lookUpResult)}
                        className="icon !w-10 !p-2"
                      />
                      <MdMoveDown
                        title="Move it to the description."
                        onClick={() => {
                          dispatch(
                            formDataReducer({
                              body:
                                body.length > 0
                                  ? body + "\n------------\n" + lookUpResult
                                  : lookUpResult,
                            }),
                          );
                        }}
                        className="icon !p-2 hover:scale-110 cursor-pointer"
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
