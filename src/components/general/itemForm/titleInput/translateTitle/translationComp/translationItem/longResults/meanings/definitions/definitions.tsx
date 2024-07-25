import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { MeaningTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { MdMoveDown } from "react-icons/md";
import { toast } from "react-toastify";
import Definition from "./definition/definition";

export default function Definitions({
  meaning,
  setDialogOpen,
}: {
  meaning: MeaningTypes;
  setDialogOpen: Function;
}) {
  useEffect(() => {
    console.log(meaning);
  });


  return (
    <ul className="">
      {meaning.definitions.map((definition, i) => {
        return (
          <li key={i} className="w-full">
           <Definition definition={definition.definition}/>
          </li>
        );
      })}
    </ul>
  );
}
