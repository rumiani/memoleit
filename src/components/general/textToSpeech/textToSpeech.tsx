import { useAppSelector } from "@/src/app/hooks";
import React, { useState } from "react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
export default function TextToSpeechSpeaker({ text }: { text: string }) {
  const { textToSpeechLang } = useAppSelector((state) => state.settingState);
  const [playing, setPlaying] = useState<boolean>(false);
  const handleSpeak = () => {
    setPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = textToSpeechLang;
    window.speechSynthesis.speak(utterance);
    const speakingRate = 10;
    utterance.addEventListener("start", () => {
      const lengthInSeconds = text.length / speakingRate;
      setTimeout(() => {
        setPlaying(false);
      }, lengthInSeconds * 1000);
    });
  };

  return (
    <div>
      <button
        disabled={playing}
        onClick={handleSpeak}
        title={textToSpeechLang}
        className={`${
          playing && "animate-pulse"
        } w-6 h-6 text-2xl disabled:cursor-not-allowed`}
      >
        <HiMiniSpeakerWave />
      </button>
    </div>
  );
}
