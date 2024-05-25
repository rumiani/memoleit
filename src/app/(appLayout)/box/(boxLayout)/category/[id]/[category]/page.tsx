"use client";
import React from "react";
import CategoryPage from "@/src/components/category-page/categoryPage";
export default function Category({ params }: { params: { id:string,category: string } }) {  
    
  return (
    <div>
      <CategoryPage categoryId={params.id} />
    </div>
  );
}
