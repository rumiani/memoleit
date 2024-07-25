import React from "react";
import TranslationItem from "./translationItem/translationItem";
import { useAppSelector } from "@/src/app/hooks";

export default function TranslationComp({
  setDialogOpen,
}: {
  setDialogOpen: Function;
}) {
  const { translatingItems,formData } = useAppSelector((state) => state.itemState);
  if (translatingItems.length === 0) {
    return <div className="text-red-500">There is no item to add</div>;
  }
  return (
    <div className="flex flex-col gap-2 w-full sm:w-96 h-96 overflow-y-auto">
      {translatingItems.map((translatingItem, i) => {
        return (
          <div key={i} className={`${translatingItem === formData.title && 'bg-green-200'}`}>
            <TranslationItem
              translatingItem={translatingItem}
              setDialogOpen={setDialogOpen}
            />
          </div>
        );
      })}
    </div>
  );
}
