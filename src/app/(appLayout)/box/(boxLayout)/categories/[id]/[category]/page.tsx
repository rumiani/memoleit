"use client";
import CategoryPage from "@/src/components/category-page/categoryPage";
import React, { useEffect } from "react";
export default function Category({ params }: { params: { category: string } }) {
 
  return (
    <div>
      <CategoryPage categoryName={params.category} />
    </div>
  );
}
