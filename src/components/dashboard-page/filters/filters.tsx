import React, { useEffect, useRef, useState } from "react";
import Form from "./form/form";
import { useAppDispatch } from "@/src/app/hooks";
import { MdFilterListAlt } from "react-icons/md";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import Dialog from "../../general/dialog/dialog";

export default function Filters() {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);
  const dispatch = useAppDispatch();

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
    <div>
      <button
        onClick={filterHnadler}
        className="first-element absolute top-10 right-10 icon text-xl !w-fit"
        title="Filter categories"
      >
        <MdFilterListAlt className="text-3xl" />
        <span className="mx-2 hidden sm:block">Filters</span>
      </button>
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <Form />
      </Dialog>
    </div>
  );
}
