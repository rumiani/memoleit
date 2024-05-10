"use client";
import React from "react";
import CategoryPage from "@/src/components/category-page/categoryPage";
export default function Category({ params }: { params: { id:string,category: string } }) {  
  console.log(params.id);
  
  return (
    <div>
      <CategoryPage categoryId={params.id} />
    </div>
  );
}
