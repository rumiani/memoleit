import React, { useState } from "react";
interface RightSoundTypes {
  SaveSoundHander: Function;
  sounds: { name: number; sound: HTMLAudioElement }[];
  value: number;
}
export default function DropDownSounds({
  SaveSoundHander,
  sounds,
  value,
}: RightSoundTypes) {
  const changeInputHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    sounds[+event.target.value - 1].sound.play()
    SaveSoundHander(+event.target.value);
  };
  return (
    <div className="w-24 flex flex-col justify-center items-start mb-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        onChange={changeInputHandler}
        value={value}
      >
        {sounds.map((item: { name: number; sound: HTMLAudioElement }, i) => (
          <option key={i} value={item.name}>
            Sound {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}
