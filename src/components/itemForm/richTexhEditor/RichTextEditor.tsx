import React, { useEffect, useState } from "react";
import {
  ContentState,
  EditorState,
  convertFromRaw,
  convertToRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import dynamic from "next/dynamic";
import { toolbar } from "./toolbar";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { FormValues } from "@/src/types/interface";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";

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
  const dispatch = useAppDispatch();

  useEffect(() => {
    console.log(defaultValue);

    if (defaultValue && !bodyLoaded) {
      let contentState;
      try {
        contentState = convertFromRaw(JSON.parse(defaultValue));
      } catch (error) {
        contentState = ContentState.createFromText(defaultValue);
      }
      const newEditorState = EditorState.createWithContent(contentState);
      const content = editorState.getCurrentContent().getPlainText("");
      setEditorContent(content);
      setEditorState(newEditorState);
      setBodyLoaded(true);
    }
    // }
  }, [defaultValue, editorState, bodyLoaded]);

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
    const content = editorState.getCurrentContent().getPlainText("");
    setEditorContent(content);
    const jsonContent = JSON.stringify(
      convertToRaw(editorState.getCurrentContent())
    );
    setValue("body", jsonContent);
    dispatch(formDataReducer({ body: editorState }));

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
    <div className="second-element">
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
