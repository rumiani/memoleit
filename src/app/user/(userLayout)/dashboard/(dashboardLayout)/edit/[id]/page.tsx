"use client";
import { useAppDispatch } from "@/src/app/hooks";
import NotFoundComp from "@/src/components/general/notFoundComp/notFoundComp";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import notFoundError from "@/src/handlers/notFoundError";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import React, { useEffect, useState } from "react";
import NewItemForm from "@/src/components/general/itemForm/newItemForm";

export default function EditPage({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setLoading(true);
    db.items
      .get(params.id)
      .then((item) => {
        if (!item) {
          setNotFound(true);
          throw notFoundError("404");
        }
        dispatch(
          formDataReducer({
            title: item.title,
            body: item.body,
            category: item.category,
          }),
        );
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        console.log("Error");
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
  }, [params, dispatch]);
  if (loading) return <LoadingPulse />;

  return <>{notFound ? <NotFoundComp /> : <NewItemForm />}</>;
}
