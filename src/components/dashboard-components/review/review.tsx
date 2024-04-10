"use client";
import React from "react";
import NoResult from "./noResult/noResult";
import { useAppSelector } from "@/src/app/hooks";
import ReviewItem from "./reviewItem/reviewItem";

export default function Review() {
  const { item } = useAppSelector((state) => state.appState);
  return <>{item.id !== '' ? <ReviewItem item={item} /> : <NoResult />}</>;
}
