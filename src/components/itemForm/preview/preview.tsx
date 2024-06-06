import React, { useEffect, useRef } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { exitFullScreen, fullScreen } from "./fullScreen";
import ItemBody from "../../general/itemBody/itemBody";
import { useAppSelector } from "@/src/app/hooks";
import ItemTitle from "../../general/itemTitle/itemTitle";

type DialogElement = HTMLDialogElement | null;

const Preview = () => {
  const { formData } = useAppSelector((state) => state.itemState);
  const dialogElement = useRef<HTMLDialogElement | null>(null);
  const itemlement = useRef<HTMLDivElement | null>(null);

  const showModalHnadler = () => {
    (dialogElement.current as DialogElement)?.showModal();
  };

  useEffect(() => {
    onclick = (e) => {
      const target = e.target as HTMLTextAreaElement;
      if (target.id === "close")
        (dialogElement.current as DialogElement)?.close();
    };
  }, []);

  return (
    <div className="item flex">
      <button
        onClick={showModalHnadler}
        style={{ background: "gray" }}
        className="primaryBtn mx-auto mb-2"
      >
        Preview
      </button>
      <dialog
        ref={dialogElement}
        className="preview rounded-lg p-2 sm:p-4 w-screen h-screen scroll-smooth"
      >
        <div ref={itemlement} className="quill my-4 p-4 ">
          <h2 className="font-bold text-gray-500 text-center my-4">Preview</h2>
          <div className="max-w-4xl break-words mx-auto">
            <div className="border border-gray-200 rounded-lg max-w-72 mx-auto px-4">
              <div className="my-4 mx-auto">{formData.category}</div>
              <ItemTitle title={formData.title} />
              <ItemBody body={formData.body} />
            </div>
            <div className="flex flex-row justify-center gap-2 my-4">
              <button
                id="close"
                className="primaryBtn"
                onClick={exitFullScreen}
              >
                Back
              </button>
              <button
                id="fullscreen"
                className="primaryBtn"
                onClick={() => fullScreen()}
              >
                Fullscreen
              </button>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default Preview;
