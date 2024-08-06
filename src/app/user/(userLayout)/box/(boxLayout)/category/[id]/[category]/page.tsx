"use client";
import CategoryPage from "@/src/components/user-pages/box/category-page/categoryPage";

export default function Category({
  params,
}: {
  params: { id: string; category: string };
}) {
  return (
    <div>
      <CategoryPage categoryId={params.id} categoryName={params.category} />
    </div>
  );
}
