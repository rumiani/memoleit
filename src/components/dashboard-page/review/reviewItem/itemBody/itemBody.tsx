import { convertFromRaw } from "draft-js";
import React, { useEffect, useState } from "react";

export default function ItemBody({ body }: { body: string }) {
  const [showBody, setShowBody] = useState<boolean>(false);

  useEffect(() => {
    setShowBody(false);
  }, [body]);

  return (
    <div className="mt-4">
      {showBody && (
        <p className="text-gray-600">
          {body.length === 0 ? "There is no description for this item." : convertFromRaw(JSON.parse(body)).getPlainText()}
        </p>
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
