import React from "react";

const sounds = {
  right: [
    "@/public/sounds/right/1.mp3",
    "@/public/sounds/right/2.mp3",
    "@/public/sounds/right/3.mp3",
    "@/public/sounds/right/4.mp3",
  ],
  wrong: [
    "@/public/sounds/wrong/1.mp3",
    "@/public/sounds/wrong/2.mp3",
    "@/public/sounds/wrong/3.mp3",
    "@/public/sounds/wrong/4.mp3",
    "@/public/sounds/wrong/5.mp3",
  ],
};
export default function AppSounds() {
  const playHandler = () => {
    console.log(sounds.right[0]);
    
    const audio = new Audio('@/public/sounds/right/1.mp3');
    audio.play();
  };
  return (
    <div>
      <button onClick={playHandler}>play</button>
    </div>
  );
}
