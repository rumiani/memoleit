import { EditorState, convertFromRaw } from "draft-js";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);
export default function ItemBody({ body }: { body: string }) {
  const [showBody, setShowBody] = useState<boolean>(false);
  const [bodyValue, setBodyValue] = useState<string>("");
  const [editorState, setEditorState] = useState<EditorState>();

  useEffect(() => {
    setShowBody(false);
    try {
      const ConvertedEditorState = EditorState.createWithContent(
        convertFromRaw(JSON.parse(body))
      );
      setEditorState(ConvertedEditorState);

      const convertedFromRaw = convertFromRaw(JSON.parse(body)).getPlainText();
      setBodyValue(convertedFromRaw);
    } catch (error) {
      setBodyValue(body);
    }
  }, [body, bodyValue]);

  return (
    <div className="w-full min-h-40 overflow-y-auto">
      <button
        onClick={() => setShowBody(!showBody)}
        className="text-blue-500  mx-auto block text-center"
      >
        {showBody ? "Hide" : "See"} Answer
      </button>
      {showBody && (
        <div dir="auto" className="text-gray-600">
          {bodyValue === "" ? (
            "There is no description for this item."
          ) : (
            <div>
              {editorState ? (
                <Editor
                  toolbarHidden={true}
                  editorState={editorState}
                  readOnly={true}
                />
              ) : (
                <p>{bodyValue}</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
