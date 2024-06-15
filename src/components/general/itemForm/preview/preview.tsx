import { useAppSelector } from "@/src/app/hooks";
import React, { useState } from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { MdPreview } from "react-icons/md";
import Dialog from "../../dialog/dialog";
import ItemBody from "../../item/itemBody/itemBody";

const Preview = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const { formData } = useAppSelector((state) => state.itemState);

  return (
    <div>
      <button
        onClick={openDialog}
        className="text-3xl text-gray-700 hover:text-black"
        title="Preview"
      >
        <MdPreview />
      </button>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <div className="w-80">
          <h2 className="font-bold text-gray-500 text-center my-4">Preview</h2>
          <div className="border border-gray-200 rounded-lg max-w-72 mx-auto px-4">
            <div className="my-4 mx-auto">{formData.category}</div>
            <p className="text-2xl font-bold  text-center">
            {formData.title}
            </p>
            <ItemBody body={formData.body} />
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Preview;
