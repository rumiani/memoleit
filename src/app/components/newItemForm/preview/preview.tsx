import React, { useEffect, useRef } from "react";
import _ from "lodash";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { exitFullScreen, fullScreen } from "./fullScreen";
import { EditorState,convertFromRaw } from "draft-js";
import { stateToHTML } from 'draft-js-export-html';
const Preview = ({ getValues }) => {
  const dialogElement = useRef(null);
  const itemlement = useRef<HTMLDialogElement | null>(null);

  const showModalHnadler = () => {
    dialogElement.current?.showModal();
    const html = stateToHTML(convertFromRaw(JSON.parse(getValues().body)))
console.log(html);

  };

  useEffect(() => {
    onclick = (event) => {
      if (event.target === dialogElement.current || event.target.id === "close")
        dialogElement.current!.close();
    };
    console.log(getValues().body)
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
          <h2 className="font-bold text-gray-500">Preview</h2>
         <div className="max-w-4xl break-words mx-auto">
          <h1 className="text-center font-bold text-2xl my-4">
              {_.capitalize(getValues().title)}
            </h1>
            <div
              className="text-lg"
              dangerouslySetInnerHTML={{ __html: stateToHTML(convertFromRaw(JSON.parse(getValues().body))) }}
            ></div>
            <div className="my-4 mx-auto">
              <br />
              Topic:              
              {_.capitalize(getValues().topic)}
              {/* {getValues().tags.array.map((tag, index) => {
                return (
                  <span className="bg-blue-200 p-1 rounded-md mx-1" key={index}>
                    {tag}
                  </span>
                );
              })} */}
            </div>
            <button id="close" className="primaryBtn mr-4"
            onClick={exitFullScreen}>
              Back
            </button>
            <button
              id="fullscreen"
              className="primaryBtn"
              onClick={() => fullScreen(itemlement.current)}
            >
              Fullscreen
            </button>
          </div>
         </div>
      </dialog>
    </div>
  );
};

export default Preview;
