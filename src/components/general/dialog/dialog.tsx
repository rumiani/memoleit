import { useEffect } from "react";
import { IoMdCloseCircle } from "react-icons/io";

type DialogProps = {
  isOpen: boolean;
  closeDialogHandler: () => void;
  children: React.ReactNode;
  closeBtn?: boolean;
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  closeDialogHandler,
  children,
  closeBtn,
}) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeDialogHandler();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, closeDialogHandler]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-35">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={closeDialogHandler}
      ></div>
      <div className="relative p-2 pt-10 flex flex-col bg-white rounded-lg shadow-lg z-10 max-w-lg w-fit">
        {closeBtn && (
          <IoMdCloseCircle
            onClick={closeDialogHandler}
            className="absolute right-2 top-2 text-2xl cursor-pointer text-red-500"
          />
        )}
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Dialog;
