import React, { useEffect, useRef } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
type DialogOptionsProps = {
  showOptions: boolean;
  setShowOptions: Function;
  children: React.ReactNode;
};
export const DialogOptions: React.FC<DialogOptionsProps> = ({
  showOptions,
  setShowOptions,
  children,
}) => {
  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modelRef.current &&
        !modelRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showOptions, setShowOptions]);
  return (
    <div className="relative">
      {showOptions ? (
        <div
          ref={modelRef}
          className="absolute right-0 flex flex-col top-0 gap-2 pt-4 p-2 w-52 h-fit rounded-lg shadow-gray-400 shadow-md bg-white text-center"
        >
          <button
            onClick={() => setShowOptions(false)}
            className="absolute right-2 top-2 rounded-full p-1 text-xl text-red-500 hover:bg-red-200 "
          >
            <IoClose />
          </button>
          <div className="p-2 pt-4 flex flex-col ">
          {children}
          </div>
        </div>
      ) : (
        <button
          onClick={() => setShowOptions(true)}
          className="icon absolute right-0"
          title="Options"
        >
          <BsThreeDotsVertical />
        </button>
      )}
    </div>
  );
};
