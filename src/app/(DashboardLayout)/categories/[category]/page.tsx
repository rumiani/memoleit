"use client";
import CategoryItems from "@/src/components/category-components/categoryItems/categoryItems";
import React from "react";

export default function Category({ params }: { params: { category: string } }) {

  return (
    <div>
      <CategoryItems params={params}/>
    </div>
  );
}
