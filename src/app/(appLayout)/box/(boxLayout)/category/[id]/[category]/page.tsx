"use client";
import CategoryPage from "@/src/components/box-super-page/category-page/categoryPage";
import React from "react";
export default function Category({ params }: { params: { id:string,category: string } }) {  
    
  return (
    <div>
      <CategoryPage categoryId={params.id} />
    </div>
  );
}
