import React from "react";
interface RightSoundTypes {
  SaveSoundHander: Function;
  sounds: { name: number; src: string }[];
  value: number;
}
export default function DropDownSounds({
  SaveSoundHander,
  sounds,
  value,
}: RightSoundTypes) {
  const changeInputHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const audio = new Audio(sounds[+event.target.value - 1].src);
    audio.play();
    SaveSoundHander(+event.target.value);
  };
  return (
    <div className="w-24 flex flex-col justify-center items-start mb-4">
      <select
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        onChange={changeInputHandler}
        value={value}
      >
        {sounds.map((sound: { name: number; src: string }, i) => (
          <option key={i} value={sound.name}>
            Sound {sound.name}
          </option>
        ))}
      </select>
    </div>
  );
}
