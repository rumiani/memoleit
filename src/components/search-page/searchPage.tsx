"use client";
import React, { useState } from "react";
import SearchInput from "./searchInput/searchInput";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { itemTypes } from "@/src/types/interface";
import CategoryItem from "../categoryitem/categoryitem";
import BoxOption from "./boxOption/boxOption";
import { searchItemHandler } from "@/src/handlers/searchItemHandler";

export default function SearchPage() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [boxNumber, setboxNumber] = useState<number | undefined>(undefined);

  const handleSearch = (searchTerm: string) => {
    setShowResult(true);
    const filteredItems = searchItemHandler(searchTerm, boxNumber);
    console.log(filteredItems);
    
    setFilteredItems(filteredItems);
  };

  return (
    <div className="w-full p-4 flex flex-col justify-around">
      <div className="sm:flex flex-row gap-4 max-w-screen-md mx-auto">
        <BoxOption handleChange={(value: number) => setboxNumber(value)} />
        <SearchInput onSearch={handleSearch} />
      </div>
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
