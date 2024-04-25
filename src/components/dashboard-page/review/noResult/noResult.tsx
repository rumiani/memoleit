import Spinner from "@/src/components/spinner/spinner";
import React, { useEffect, useState } from "react";
import NextClosest from "./nextClosest/nextClosest";

export default function NoResult() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });
  return (
    <div className="p-8 flex flex-col text-center justify-center">
      <NextClosest />
      {loading ? (
        <Spinner size={100} />
      ) : (
        <p className="text-red-500 mt-5">
          There is no item to review.
          <br />
          Please click on filters button and choose a category or add a new item
          to review.
        </p>
      )}
    </div>
  );
}
