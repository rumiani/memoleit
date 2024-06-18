import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useAppSelector } from "@/src/app/hooks";
export default function DocumentOptions({
  openDialog,
}: {
  documentElement: HTMLDivElement;
  openDialog: Function;
}) {
  const { title } = useAppSelector((state) => state.itemState.formData);
  return (
    <div className="flex flex-row bg-gray-200 bg-opacity-30 rounded-lg p-2">
      {title.length > 0 && (
        <CiSquarePlus
          className="icon text-green-600"
          onClick={() => openDialog()}
        />
      )}
    </div>
  );
}
