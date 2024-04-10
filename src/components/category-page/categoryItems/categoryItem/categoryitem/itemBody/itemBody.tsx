import React, { useState } from "react";

export default function ItemBody({ body }: { body: string }) {
  const [showBody, setShowBody] = useState<boolean>(false);

  return (
    <div>
      {showBody && <p className="text-gray-600">{body}</p>}
      <button
        onClick={() => setShowBody(!showBody)}
        className="text-blue-500 w-fit mx-auto block text-center"
      >
        {showBody ? "Hide" : "See"} the descriptiond
      </button>
    </div>
  );
}
