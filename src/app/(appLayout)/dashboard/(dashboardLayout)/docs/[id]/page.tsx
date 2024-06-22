"use client";
import BookPage from "@/src/components/super-page-dashboard/docs-page/book-page/bookPage";
import React from "react";

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <BookPage id={params.id} />
    </div>
  );
}
