import { ChangeEventHandler } from "react";
interface CheckBoxInputTypes {
  isChecked: boolean;
  id: string;
  name: string;
  inputChangeHandler: ChangeEventHandler<HTMLInputElement>;
}
export default function CheckBoxInput({
  isChecked,
  id,
  name,
  inputChangeHandler,
}: CheckBoxInputTypes) {
  return (
    <div>
      <div className="flex relative ">
        <input
          checked={isChecked}
          onChange={inputChangeHandler}
          type="checkbox"
          id={id}
          name={name}
          className="cursor-pointer
relative peer shrink-0 flex justify-center align-middle
appearance-none w-5 h-5 border-2 border-blue-500 rounded-sm bg-white
mt-1 mx-0
checked:bg-blue-600 checked:border-0"
        />
        <label htmlFor={id} className=" cursor-pointer pl-2">
          {name}
        </label>
        <svg
          className="
        cursor-pointer
absolute 
w-4 h-4 mt-[6px] ml-[2px]
hidden peer-checked:block
pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
    </div>
  );
}
