import React from "react";
import TranslationItem from "./translationItem/translationItem";
import { useAppSelector } from "@/src/app/hooks";
import SelectionTextComp from "@/src/components/user-pages/dashboard/docs-page/book-page/docContainer/selectionTextComp/selectionTextComp";

export default function TranslationComp({
  setDialogOpen,
}: {
  setDialogOpen: Function;
}) {
  const { translatingItems, formData } = useAppSelector(
    (state) => state.itemState,
  );
  if (translatingItems.length === 0) {
    return (
      <div className="text-red-500 text-center my-8">
        There is no item to add
      </div>
    );
  }
  return (
    <div className="relative flex flex-col gap-2  overflow-y-auto">
      {translatingItems.map((translatingItem, i) => {
        return (
          <div
            key={i}
            className={`${translatingItem === formData.title && "bg-green-200"} w-full`}
          >
            <TranslationItem
              translatingItem={translatingItem}
              setDialogOpen={setDialogOpen}
            />
          </div>
        );
      })}
      <SelectionTextComp />
    </div>
  );
}
