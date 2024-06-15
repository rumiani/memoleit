import React, { useState } from "react";
import { GoTriangleDown } from "react-icons/go";
import HilightedTextDialog from "./HilightedTextDialog/HilightedTextDialog";
import { toast } from "react-toastify";
import { useAppSelector } from "@/src/app/hooks";
import Dialog from "@/src/components/general/dialog/dialog";
import getPosition from "./handler/getPosition";
interface SelectionTypes {
  highlightPosition: {
    top: number;
    left: number;
  } | null;
}
export default function SelectionModal({ highlightPosition }: SelectionTypes) {
  const { title: highlightedText } = useAppSelector(
    (state) => state.itemState.formData
  );


  const position = getPosition(highlightPosition!);
  return (
    <div className="z-50">
      
    </div>
  );
}
