"use client";
import Items from "@/src/components/category-components/items/items";
import React from "react";

export default function Category({ params }: { params: { category: string } }) {

  return (
    <div>
      <Items params={params}/>
    </div>
  );
}
