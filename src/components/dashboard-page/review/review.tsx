"use client";
import React from "react";
import NoResult from "./noResult/noResult";
import { useAppSelector } from "@/src/app/hooks";
import ReviewItemCard from "./reviewItem/reviewItemCard";

export default function Review() {
  const { item } = useAppSelector((state) => state.appState);
  return <>{item.id !== '' ? <ReviewItemCard item={item} /> : <NoResult />}</>;
}
