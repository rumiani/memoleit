"use client";
import CategoryPage from "@/src/components/category-page/categoryPage";
import React from "react";
export default function Category({ params }: { params: { category: string } }) {
  return (
    <div>
      <CategoryPage params={params} />
    </div>
  );
}
