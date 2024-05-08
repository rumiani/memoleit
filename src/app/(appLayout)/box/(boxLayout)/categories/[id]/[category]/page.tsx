"use client";
import React from "react";
import CategoryPage from "@/src/components/category-page/categoryPage";
export default function Category({ params }: { params: { category: string } }) {
  return (
    <div>
      <CategoryPage categoryName={params.category} />
    </div>
  );
}
