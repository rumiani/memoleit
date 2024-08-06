import { useEffect, useState } from "react";

export default function ItemBody({ body }: { body: string }) {
  const [showBody, setShowBody] = useState<boolean>(false);

  useEffect(() => {
    setShowBody(false);
  }, []);

  return (
    <div className="my-4">
      <button
        onClick={() => setShowBody(!showBody)}
        className="text-blue-500  mx-auto block text-center"
      >
        {showBody ? "Hide" : "See"} Answer
      </button>
      {showBody && (
        <div dir="auto" className="text-gray-600">
          {body === "" ? (
            "There is no description for this item."
          ) : (
            <p>{body}</p>
          )}
        </div>
      )}
    </div>
  );
}
