import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import TextToSpeechSpeaker from "@/src/components/general/textToSpeech/textToSpeech";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import notFoundError from "@/src/handlers/notFoundError";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import React, { useState } from "react";
import { toast } from "react-toastify";

export default function Dictionary() {
  const { title: word } = useAppSelector((state) => state.itemState.formData);
  const { isTextToSpeechOn, textToSpeechLang } = useAppSelector(
    (state) => state.settingState
  );
  const [data, setData] = useState("");
  const [lookingUp, setLookingUp] = useState<boolean>(false);
  const [notFount, setNotFount] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const lookUpHandler = async () => {
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
    <div className="flex flex-col gap-2">
      <button onClick={lookUpHandler} className="primaryBtn mx-auto">
        Look up
      </button>
      {lookingUp ? (
        <LoadingPulse />
      ) : (
        <div>
          {notFount ? (
            <p className="text-red-500">Nothing found.</p>
          ) : (
            <div>
              {data !== "" && (
                <div className="flex flex-col gap-2 my-2">
                  <div className="flex flex-row gap-4">
                    {isTextToSpeechOn && <TextToSpeechSpeaker text={word} />}
                    {word}
                  </div>
                  <span>{data}</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
