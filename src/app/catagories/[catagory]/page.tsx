"use client";
import Items from "@/src/components/items/items";
import React from "react";

export default function Catagory({ params }: { params: { catagory: string } }) {


  return (
    <div>
      <Items params={params}/>
    </div>
  );
}
