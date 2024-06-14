import React, { useState } from "react";
import NewItemForm from "@/src/components/itemForm/newItemForm";

export default function AddToLeitner() {
  const [showForm, setShowForm] = useState<boolean>(false);
  return (
    <div>
      {showForm ? (
        <NewItemForm />
      ) : (
        <button
          onClick={() => setShowForm(true)}
          className="primaryBtn !bg-green-400 hover:bg-green-600 !w-fit"
        >
          Add to Leitner
        </button>
      )}
    </div>
  );
}
