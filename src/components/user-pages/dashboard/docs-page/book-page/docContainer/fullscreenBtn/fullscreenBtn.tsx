import { useState } from "react";
import { MdFullscreen } from "react-icons/md";
import { MdFullscreenExit } from "react-icons/md";
import fullscreenHandler from "./handlers/openFullscreen";

export default function FullscreenBtn({
  documentElement,
}: {
  documentElement: HTMLDivElement;
}) {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  return (
    <button
      onClick={() => {
        setIsFullscreen(!isFullscreen);
        if (documentElement) fullscreenHandler(documentElement);
      }}
      className="icon"
    >
      {isFullscreen ? (
        <MdFullscreenExit className="text-gray-500 text-2xl" />
      ) : (
        <MdFullscreen className="text-gray-500 text-2xl" />
      )}
    </button>
  );
}
