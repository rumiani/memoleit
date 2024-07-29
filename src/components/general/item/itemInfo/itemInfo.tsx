import { ItemTypes } from "@/src/types/interface";
import React, { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import Dialog from "../../dialog/dialog";
import LeitnerPic from "./leitnerPic";

export default function ItemInfo({ item }: { item: ItemTypes }) {
  const [isDialogOpen, setDialogOpen] = useState(false);
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

  return (
    <div>
      <button
        onClick={openDialog}
        title="This is the progress bar"
        className="mr-2 mt-4 text-md w-4 h-4 text-gray-600 hover:text-gray-900 rounded-full"
      >
        <IoInformationCircleOutline />
      </button>

      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <div className="flex flex-col items-start">
          <span>
            Item: <strong>{item.title}</strong>
          </span>
          <span>
            Category: <strong>{item.category}</strong>
          </span>
          <span>
            Item is in the box: <strong>{item.box}</strong>
          </span>
          <span>
            Remained reviews: <strong>{6 - item.box}</strong>
          </span>
          <p className="text-green-500 text-left">
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
        <div className="relative w-72 h-40  max-w-lg my-8 mx-auto overflow-hidden">
          <div className="absolute flex flex-wrap  w-[252px] h-5 ml-[11px] top-[44%]">
            {[1, 2, 3, 4, 5].map((box) => (
              <div
                key={box}
                className={`w-[33px]  h-[19px]  ${box === 2 && "ml-[19px] mr-[22px]"} ${box === 4 && "ml-[25px] mr-[21px]"} ${
                  item.box !== box
                    ? "bg-gray-600 opacity-50"
                    : "bg-green-700 flex justify-center items-center text-white text-sm font-bold "
                }`}
              >
                <span className="animate-pulse">{item.box === box && box}</span>
              </div>
            ))}
          </div>

          <LeitnerPic />
        </div>
      </Dialog>
    </div>
  );
}
