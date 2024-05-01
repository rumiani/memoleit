import React, { useState } from "react";
import { HiMiniSpeakerWave } from "react-icons/hi2";
export default function Speaker({ text }: { text: string }) {
  const [playing, setPlaying] = useState<boolean>(false);
  const handleSpeak = () => {
    setPlaying(true);
    const utterance = new SpeechSynthesisUtterance(text);
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
    <button
      disabled={playing}
      onClick={handleSpeak}
      className={`${playing && "animate-pulse"} w-6 h-6 text-2xl disabled:cursor-not-allowed`}
    >
      <HiMiniSpeakerWave />
    </button>
  );
}
