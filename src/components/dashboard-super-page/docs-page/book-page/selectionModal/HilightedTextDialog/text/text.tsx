import { useAppSelector } from "@/src/app/hooks";
import React, { useState } from "react";
import { FaRegCopy } from "react-icons/fa";
import { toast } from "react-toastify";

export default function Text() {
  const { title: text } = useAppSelector((state) => state.itemState.formData);
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success("Text copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy text to clipboard");
    }
  };
  return (
    <div className="flex flex-row justify-between">
      <p className="font-medium">{text}</p>
      <FaRegCopy
        onClick={copyToClipboard}
        className="hover:scale-110 cursor-pointer"
      />
    </div>
  );
}
