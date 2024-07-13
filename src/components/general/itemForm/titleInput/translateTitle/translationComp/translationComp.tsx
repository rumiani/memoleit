import React from "react";
import TranslationItem from "./translationItem/translationItem";
import { useAppSelector } from "@/src/app/hooks";

export default function TranslationComp({
  setDialogOpen,
}: {
  setDialogOpen: Function;
}) {
  const { translatingItems } = useAppSelector((state) => state.itemState);
  return (
    <div className="flex flex-col gap-2 w-72 h-96 overflow-y-auto">
      {translatingItems.map((translatingItem, i) => {
        return (
          <div key={i}>
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
