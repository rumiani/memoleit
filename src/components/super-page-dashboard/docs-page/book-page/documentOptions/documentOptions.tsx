import React from "react";
import { CiSquarePlus } from "react-icons/ci";
import { useAppSelector } from "@/src/app/hooks";
import FullscreenBtn from "./fullscreenBtn/fullscreenBtn";
export default function DocumentOptions({
  openDialog,
  documentElement,
}: {
  documentElement: HTMLDivElement;
  openDialog: Function;
}) {
  const { title } = useAppSelector((state) => state.itemState.formData);
  return (
    <div className="w-fit flex flex-col bg-gray-400 bg-opacity-30 rounded-lg p-2">
      {/* {title.length > 0 && ( */}
      <FullscreenBtn documentElement={documentElement} />
      <CiSquarePlus
        className="icon text-green-600"
        onClick={() => openDialog()}
      />
      {/* )} */}
    </div>
  );
}
