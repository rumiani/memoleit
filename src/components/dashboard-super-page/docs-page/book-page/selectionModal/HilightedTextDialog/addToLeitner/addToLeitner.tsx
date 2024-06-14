import NewItemForm from "@/src/components/general/item/itemForm/newItemForm";
import React, { useState } from "react";

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
