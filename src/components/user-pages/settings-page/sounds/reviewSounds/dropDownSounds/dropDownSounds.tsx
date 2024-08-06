interface RightSoundTypes {
  SaveSoundHander: Function;
  sounds: { name: number; src: string }[];
  soundSrc: string;
}
export default function DropDownSounds({
  SaveSoundHander,
  sounds,
  soundSrc,
}: RightSoundTypes) {
  const changeInputHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const audio = new Audio(event.target.value);
    audio.play();
    SaveSoundHander(event.target.value);
  };
  return (
    <div className="w-24 flex flex-col justify-center items-start mb-4">
      <select
        className="w-full text-sm p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
        onChange={changeInputHandler}
        value={soundSrc}
      >
        {sounds.map((sound: { name: number; src: string }, i) => (
          <option key={i} value={sound.src}>
            Sound {sound.name}
          </option>
        ))}
      </select>
    </div>
  );
}
