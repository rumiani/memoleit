"use client";
import React from "react";
import Item from "../../item/item";
import NoResult from "./noResult/noResult";
import { useAppSelector } from "@/src/app/hooks";

export default function Review() {
  const { item } = useAppSelector((state) => state.appState);

  return <>{item.id ? <Item item={item} /> : <NoResult />}</>;
}
