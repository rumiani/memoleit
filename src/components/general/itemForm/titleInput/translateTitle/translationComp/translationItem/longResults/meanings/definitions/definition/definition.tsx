import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { MdMoveDown } from "react-icons/md";

export default function Definition({definition}:{definition:string}) {
  const dispatch = useAppDispatch();
  const { formData } = useAppSelector((state) => state.itemState);
  const [isAdded,setIsAdded]= useState<boolean>(false)
  return (
    <div className="flex flex-row items-start">
      {" "}
      <p className="flex-1">- {definition}</p>
      <MdMoveDown
        title="Move it to the description."
        onClick={() => {
          dispatch(
            formDataReducer({
              title: formData.title,
              body: isEmpty(formData.body.trim())
                ? definition
                : formData.body + "\n\n" + definition,
            }),
          );
          setIsAdded(true);
        }}
        className={`${isAdded && "text-green-600"} icon !p-2 hover:scale-110 cursor-pointer`}
      />
    </div>
  );
}
