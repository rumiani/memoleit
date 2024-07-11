import NewItemForm from "@/src/components/general/itemForm/newItemForm";
import React, { useState } from "react";

export default function AddToLeitner() {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div className="flex flex-col justify-center my-4">
      {showForm ? (
        <NewItemForm />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="primaryBtn !mx-auto !bg-green-400 hover:bg-green-600 !w-fit"
        >
          Add to Leitner
        </button>
      )}
    </div>
  );
}
