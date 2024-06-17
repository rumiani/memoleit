import React, { useState } from "react";
import Form from "./form/form";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { MdFilterListAlt } from "react-icons/md";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { TbHandFinger } from "react-icons/tb";
import Dialog from "@/src/components/general/dialog/dialog";

export default function Filters() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const dispatch = useAppDispatch();
  const { items,numberOfItemsToReview } = useAppSelector((state) => state.itemState);

  const filterHnadler = async () => {
    try {
      openDialog();
      const storedCategories = await getCategoriesHandler();
      if (storedCategories) dispatch(categoriesReducer(storedCategories));
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="relative flex justify-end">
      <button
        onClick={filterHnadler}
        className="first-element top-10 right-10 icon text-xl !w-fit"
        title="Filter categories"
      >
        <MdFilterListAlt className="text-3xl" />
        <span className="mx-2 hidden sm:block">Filters</span>
      </button>
      {items.length === 0 && numberOfItemsToReview >0 && (
        <TbHandFinger className="absolute top-12  right-2  text-xl text-green-600 animate-bounce rotate-90" />
      )}
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <Form />
      </Dialog>
    </div>
  );
}
