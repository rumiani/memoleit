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
      if (modelRef.current && !modelRef.current.contains(event.target as Node))
        setShowOptions(false);
    };
    if (showOptions) document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showOptions, setShowOptions]);
  return (
    <div className="relative">
      {showOptions && (
        <div
          ref={modelRef}
          className="absolute right-5 top-9 py-2 flex flex-col w-44 h-fit rounded-lg shadow-gray-400 shadow-md bg-white text-center"
        >
          {children}
        </div>
      )}
      <div className="icon h-10 w-10 p-1">
        {showOptions ? (
          <IoClose
            onClick={() => setShowOptions(false)}
            className="w-full h-full  p-1"
          />
        ) : (
          <BsThreeDotsVertical
            onClick={() => setShowOptions(true)}
            className="w-full h-full p-2"
            title="Options"
          />
        )}
      </div>
    </div>
  );
};
