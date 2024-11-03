"use client";
import { useState } from "react";
import Link from "next/link";
import { useParams, usePathname, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { EssayObjectTypes } from "@/src/types/interface";
import { db } from "@/src/services/db";
import notFoundError from "@/src/handlers/notFoundError";
import { useRouter } from "next/navigation";
import { getCategoryUrl } from "@/src/handlers/getUrls/getCategoryUrl";
import { useAppDispatch } from "@/src/app/hooks";
import appPages from "@/src/data/appPages/appPages";
import { DialogOptions } from "@/src/components/general/dialogOptions/dialogOptions";
import { essaysPageUrl } from "@/src/handlers/general/pagesLinks";
import { allEssaysReducer } from "@/src/redux/slices/essayStateSlice";

export default function EssayOptions({ essay }: { essay: EssayObjectTypes }) {
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useAppDispatch();

  const removeBtnFunction = async () => {
    setShowOptions(false);
    try {
      const foundEssay = await db.essays.get(essay.id);
      if (!foundEssay) throw notFoundError("404");
      await db.essays.delete(essay.id);
      const fetchedEssays = await db.essays.toArray();
      dispatch(allEssaysReducer(fetchedEssays));
      toast.success("The essay was removed.");
    } catch (error: any) {
      if ((error.name = "404")) toast.error("Essay was not found");
    }
  };

  return (
    <div className="z-10 relative">
      <DialogOptions showOptions={showOptions} setShowOptions={setShowOptions}>
        <div className="flex flex-col">
          <Link
            href={essaysPageUrl + essay.id}
            className=" text-blue-400 hover:text-blue-600 optionsBtn"
          >
            Open Essay
          </Link>
          <button
            onClick={() => removeBtnFunction()}
            className="w-full  text-red-400 hover:text-red-600 optionsBtn "
          >
            Remove
          </button>
        </div>
      </DialogOptions>
    </div>
  );
}
