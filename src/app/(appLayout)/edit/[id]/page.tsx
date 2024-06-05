"use client";
import { useAppDispatch } from "@/src/app/hooks";
import EditItemForm from "@/src/components/itemForm/editItemForm";
import notFoundError from "@/src/handlers/notFoundError";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import React, { useEffect } from "react";

export default function Item({ params }: { params: { id: string } }) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    db.items
      .get(params.id)
      .then((item) => {
        if (!item) throw notFoundError("404");
        dispatch(formDataReducer({
          title: item.title,
          body: item.body,
          category: item.category,
        }));
      })
      .catch(() => {
        console.log(Error);
      });
  }, [params,dispatch]);
  return (
    <div>
      <EditItemForm id={params.id} />
    </div>
  );
}
