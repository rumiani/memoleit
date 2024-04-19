import React, { SetStateAction, useEffect, useState } from "react";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { toolbar } from "./toolbar";
import {
  UseFormGetValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import { FormValues } from "@/src/types/interface";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
interface propsEditor {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
  setValue: UseFormSetValue<FormValues>;
  defaultValue?: string;
}

const RichTextEditor = ({
  register,
  error,
  setValue,
  defaultValue,
}: propsEditor) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [editorContent, setEditorContent] = useState("");
  const [bodyLoaded, setBodyLoaded] = useState(false);


  useEffect(() => {
    if (defaultValue && !bodyLoaded) {
      const contentState = convertFromRaw(JSON.parse(defaultValue));
      const newEditorState = EditorState.createWithContent(contentState);
      const content = editorState.getCurrentContent().getPlainText("");
      setEditorContent(content);
      setEditorState(newEditorState);
      setBodyLoaded(true)
    }
    // }
  }, [defaultValue,editorState, bodyLoaded]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const content = editorState.getCurrentContent().getPlainText("");
    setEditorContent(content);
    console.log(editorState.getCurrentContent());

    const jsonContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    setValue("body", jsonContent);

    register("body", {
      validate: {
        fieldLength: () => {
          return (
            editorContent.length <= 1000 || "Body must be ≤ 1000 character"
          );
        },
      },
    });
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbar={toolbar}
        editorClassName="editor"
        placeholder="Add a description here ..."
      />
      <p>{editorContent.length + "/1000"}</p>
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
};

export default RichTextEditor;
