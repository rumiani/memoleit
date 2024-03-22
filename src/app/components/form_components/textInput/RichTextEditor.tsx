import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw } from "draft-js";
import he from 'he'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const toolbar = {
  options: ["inline", "blockType", "list", "textAlign", "colorPicker", "link"],
  inline: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: [
      "bold",
      "italic",
      "underline",
      "strikethrough",
      "monospace",
      "superscript",
      "subscript",
    ],
  },
  blockType: {
    inDropdown: true,
    options: [
      "Normal",
      "H1",
      "H2",
      "H3",
      "H4",
      "H5",
      "H6",
      "Blockquote",
      "Code",
    ],
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
  },
  list: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["unordered", "ordered"],
  },
  textAlign: {
    inDropdown: true,
    className: undefined,
    component: undefined,
    dropdownClassName: undefined,
    options: ["left", "center", "right", "justify"],
  },
  link: {
    inDropdown: false,
    className: undefined,
    component: undefined,
    popupClassName: undefined,
    dropdownClassName: undefined,
    showOpenOptionOnHover: true,
    defaultTargetOption: "_self",
    options: ["link"],
    linkCallback: undefined,
  },
};
const RichTextEditor = ({register,error,setValue, getValues, watch}) => {
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
