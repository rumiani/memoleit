import React, { useState } from "react";
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
        fullscreenHandler(documentElement)
      }}
      className="icon"
    >
      {isFullscreen ? (
        <MdFullscreenExit className="text-5xl" />
      ) : (
        <MdFullscreen className="text-5xl" />
      )}
    </button>
  );
}
