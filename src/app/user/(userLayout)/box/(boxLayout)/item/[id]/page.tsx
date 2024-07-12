"use client";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import NotFoundComp from "@/src/components/general/notFoundComp/notFoundComp";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import notFoundError from "@/src/handlers/notFoundError";
import { itemReducer } from "@/src/redux/slices/itemStateSlice";
import { db } from "@/src/services/db";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import CategoryItem from "@/src/components/general/categoryitem/categoryitem";
import { superPages } from "@/src/components/general/layouts/appLayout/appLayout";
import { newPageUrl, reviewPageUrl } from "@/src/handlers/general/pagesLinks";

export default function Item({ params }: { params: { id: string } }) {
  const { item } = useAppSelector((state) => state.itemState);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log(superPages);
    
    setLoading(true);
    db.items
      .get(params.id)
      .then((item) => {
        if (!item) {
          setNotFound(true);
          throw notFoundError("404");
        }
        dispatch(itemReducer(item));

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
  if (loading) return <LoadingPulse />;

  return (
    <div>
      {notFound ? <NotFoundComp /> : <CategoryItem item={item} />}

      <div className="text-center flex flex-col gap-10 items-center w-full p-4">
        <div className="flex flex-row gap-4 max-w-xs">
          <Link
            href={reviewPageUrl}
          >
            <button className="primaryBtn">Review</button>
          </Link>
          <Link href={newPageUrl}>
            <button className="primaryBtn">New item</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
