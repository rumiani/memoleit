"use client";
import React, { Suspense } from "react";
import SearchPage from "@/src/components/user-pages/box/search-page/searchPage";

export default function Search() {
  return (
    <div>
      <Suspense>
        <SearchPage />
      </Suspense>
    </div>
  );
}
