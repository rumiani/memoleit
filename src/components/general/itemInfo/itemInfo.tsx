import { useAppDispatch } from "@/src/app/hooks";
import { ItemTypes } from "@/src/types/interface";
import React, { useEffect, useRef, useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import heroImage from "@/public/assets/images/leitner.webp";
import ImgHoverZoom from "../../imgHoverZoom/imgHoverZoom";
import Image from "next/image";
import Dialog from "../dialog/dialog";

export default function ItemInfo({ item }: { item: ItemTypes }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div>
      <button
        onClick={openDialog}
        title="This is the progress bar"
        className="mr-1 mt-5 text-xs text-gray-600 h-3 hover:text-gray-900 rounded-full"
      >
        <IoInformationCircleOutline />
      </button>

      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <div>
          The item <strong>{item.title}</strong> under the category of{" "}
          <strong>{item.category}</strong>, is in the box{" "}
          <strong>{item.box}</strong> and it needs to be reviewed{" "}
          <strong>{6 - item.box}</strong> more times.
          <p className="text-green-500">
            - If you know the item,{" "}
            {item.box === 5 ? (
              " the learning proccess will complete and the word will be archived."
            ) : (
              <>
                it will move to the box <strong>{item.box + 1}</strong> &nbsp;
              </>
            )}
          </p>
          <p className="text-red-500">
            - If you don&apos;t know it, it will move to the box{" "}
            <strong>1</strong>.
          </p>{" "}
        </div>
        <div className="relative w-72 h-40 bg-slate-400 max-w-lg my-8 mx-auto overflow-hidden">
          <div className="absolute z-10 flex flex-wrap top-[30%] w-full h-20">
            {[1, 2, 3, 4, 5].map((box) => {
              return (
                <div
                  key={box}
                  className={`w-1/5 h-14 ${
                    item.box !== box
                      ? "bg-gray-500 opacity-50"
                      : "border-b-2 border-green-500"
                  }`}
                ></div>
              );
            })}
          </div>
          <Image
            unoptimized
            src={heroImage}
            width={100}
            alt="Leitner box explained"
            loading="lazy"
            className="w-full h-fit scale-125"
          />
        </div>
      </Dialog>
    </div>
  );
}
