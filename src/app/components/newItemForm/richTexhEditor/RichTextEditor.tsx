import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { toolbar } from "./toolbar";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);


const RichTextEditor = ({register,error,setValue }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [hideToolbar, setHideToolbar] = useState(true);
  useEffect(() => {
    // console.log(editorState);
  }, [editorState]);
  
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    const content = editorState.getCurrentContent().getPlainText('')
    const jsonContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    register("body", {
      required: "Body is required",
      validate: {
        minMax: () => {
          return (
            content.length - 1 > 10 || `Body must be 3-1000 character`
          );
        },
      },
    });
    setValue('body',jsonContent)
    // console.log();
    // console.log(jsonContent);
  };


  return (
    <div>
      <Editor
        onFocus={() => setHideToolbar(false)}
        onBlur={() => setHideToolbar(true)}
        toolbarHidden={hideToolbar}
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbar}
        editorClassName="editor"
        placeholder="Add a description here ..."
      />
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
};

export default RichTextEditor;
