"use client";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import NotFoundComp from "@/src/components/general/notFoundComp/notFoundComp";
import NewItemForm from "@/src/components/itemForm/newItemForm";
import LoadingPulses from "@/src/components/loading-comps/loadingPulses/loadingPulses";
import notFoundError from "@/src/handlers/notFoundError";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import React, { useEffect, useState } from "react";

export default function Item({ params }: { params: { id: string } }) {
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(true);
  const dispatch = useAppDispatch();
  useEffect(() => {
    setNotFound(false);
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
          })
        );
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch(() => {
        console.log("Error");
        setTimeout(() => {
          setLoading(false);
          setLoading(false);
        }, 1000);
      });
  }, [params, dispatch]);
  if (loading) return <LoadingPulses />;

  return <>{notFound ? <NotFoundComp /> : <NewItemForm />}</>;
}
