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
    setValue('body',content)
    register("body", {
      required: "Body is required",
      pattern: {
        value: /^.{3,100}$/,
        message: "Body must be 3-100 character",
      },
    });
  };


  return (
    <div>
      <Editor
        // onFocus={() => setHideToolbar(false)}
        // onBlur={() => setHideToolbar(true)}
        // toolbarHidden={hideToolbar}
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
