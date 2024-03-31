import Spinner from "@/src/components/spinner/spinner";
import React, { useEffect, useState } from "react";

export default function NoResult() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <div className="p-8 flex justify-center">
      {loading ? (
        <Spinner size={100} />
      ) : (
        <p className="text-red-500 mt-5">
          There is no item to review.
          <br />
          Please click on filters button and choose a catagory or add a new item
          to review.
        </p>
      )}
    </div>
  );
}
