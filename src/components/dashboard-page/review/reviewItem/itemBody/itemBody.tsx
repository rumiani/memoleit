import { convertFromRaw } from "draft-js";
import React, { useEffect, useState } from "react";

export default function ItemBody({ body }: { body: string }) {
  const [showBody, setShowBody] = useState<boolean>(false);
  const [bodyValue, setBodyValue] = useState<string>("");

  useEffect(() => {
    setShowBody(false);
    if (body) {
      const convertedFromRaw = convertFromRaw(JSON.parse(body)).getPlainText();
      setBodyValue(convertedFromRaw);
    }
  }, [body]);

  return (
    <div className="mt-4">
      {showBody && (
        <div className="text-gray-600">
          {bodyValue === ''
            ? "There is no description for this item."
            : bodyValue}
        </div>
      )}
      <button
        onClick={() => setShowBody(!showBody)}
        className="text-blue-500 w-fit mx-auto block text-center"
      >
        {showBody ? "Hide" : "See"} the description
      </button>
    </div>
  );
}
