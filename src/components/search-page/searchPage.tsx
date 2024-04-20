"use client";
import React, { useState } from "react";
import SearchInput from "./searchInput/searchInput";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { itemTypes } from "@/src/types/interface";
import CategoryItem from "../categoryitem/categoryitem";

export default function SearchPage() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const handleSearch = (searchTerm: string) => {
    setShowResult(true)
    const { itemsData } = getAppDataHandler();
    const filtered = itemsData.filter(
      (item: itemTypes) =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.body.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  return (
    <div className="w-full p-4 flex flex-col justify-around">
      <SearchInput onSearch={handleSearch} />

      {showResult && (
        <div className="flex flex-wrap gap-2 my-16">
          {filteredItems.length > 0 ? (
            filteredItems.map((item: itemTypes) => (
              <CategoryItem key={item.id} item={item} />
            ))
          ) : (
            <p className="text-red-500 text-center mx-8 my-16">
              No items found with this search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
