import { CategoryTypes } from "@/src/types/interface";
import React, { useEffect, useRef, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import CategoryDelete from "./categoryDelete/categoryDelete";
import { useAppDispatch } from "@/src/app/hooks";
import {
  categoriesReducer,
  categoryOnEditReducer,
  categoryReducer,
} from "@/src/redux/slices/categoryStateSlice";
import { toast } from "react-toastify";
import deleteCategoryHandler from "../../handlers/deleteCategoryHandler";
import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { DialogOptions } from "@/src/components/general/dialogOptions/dialogOptions";

export default function CardOptions({ category }: { category: CategoryTypes }) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();

  const modelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        modelRef.current &&
        !modelRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };
    if (showOptions) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showOptions]);

  const editHandler = () => {
    setShowOptions(false);
    dispatch(categoryOnEditReducer(category.id));
  };

  const deleteHandler = async () => {
    setShowOptions(false);
    try {
      await deleteCategoryHandler(category.id);
      const categories = await getCategoriesHandler();
      if (categories) {
        dispatch(categoriesReducer(categories));
      }
      toast.success(category.name + " category was successfully deleted.", {
        autoClose: 2000,
      });
    } catch (error: any) {
      if (error.name === "404") {
        toast.error(category.name + " was not found");
      } else {
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div>
      <DialogOptions setShowOptions={setShowOptions} showOptions={showOptions}>
        <button
          onClick={editHandler}
          className="optionsBtn text-yellow-400 hover:text-yellow-600"
        >
          Edit
        </button>{" "}
        <CategoryDelete category={category} deleteHandler={deleteHandler} />
      </DialogOptions>
    </div>
  );
}
