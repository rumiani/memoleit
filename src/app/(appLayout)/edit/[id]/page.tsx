"use client";
import { useAppDispatch } from "@/src/app/hooks";
import NewItemForm from "@/src/components/itemForm/newItemForm";
import LoadingPulses from "@/src/components/loading-comps/loadingPulses/loadingPulses";
import notFoundError from "@/src/handlers/notFoundError";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import React, { useEffect, useState } from "react";

export default function Item({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(true);
    db.items
      .get(params.id)
      .then((item) => {
        if (!item) throw notFoundError("404");
        dispatch(
          formDataReducer({
            title: item.title,
            body: item.body,
            category: item.category,
          })
        );
        setTimeout(() => {
          setLoading(false);
        }, 500);
      })
      .catch(() => {
        console.log(Error);
      });
  }, [params, dispatch]);
  return <div>{loading ? <LoadingPulses /> : <NewItemForm />}</div>;
}
