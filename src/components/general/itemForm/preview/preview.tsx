import { useAppSelector } from "@/src/app/hooks";
import { useState } from "react";
import Dialog from "../../dialog/dialog";
import ItemBody from "../../item/itemBody/itemBody";
import { capitalize } from "lodash";
import { FaEye } from "react-icons/fa";
const Preview = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  const { formData } = useAppSelector((state) => state.itemState);

  return (
    <div className="absolute bottom-3 left-2 w-8 h-8">
      {formData.title !== "" &&
        formData.body !== "" &&
        formData.category !== "" && (
          <div>
            <FaEye
              onClick={openDialog}
              className="cursor-pointer text-3xl p-1 text-gray-700 hover:text-black"
              title="Preview"
            />
            <Dialog isOpen={isDialogOpen} closeBtn closeDialogHandler={closeDialog}>
              <div className="w-80">
                <h2 className="font-bold text-gray-500 text-center my-4">
                  Preview
                </h2>
                <div className="border border-gray-200 rounded-lg max-w-72 mx-auto px-4">
                  <div className="my-4 mx-auto">
                    {capitalize(formData.category)}
                  </div>
                  <p className="text-2xl font-bold  text-center">
                    {capitalize(formData.title)}
                  </p>
                  <ItemBody body={formData.body} />
                </div>
              </div>
            </Dialog>
          </div>
        )}
    </div>
  );
};

export default Preview;
