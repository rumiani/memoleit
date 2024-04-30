"use client";
import React, { useState } from "react";
import SearchInput from "./searchInput/searchInput";
import CategoryItem from "../categoryitem/categoryitem";
import BoxOption from "./boxOption/boxOption";
import { searchItemHandler } from "@/src/handlers/searchItemHandler";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";
import { ItemTypes } from "@/src/types/interface";

export default function SearchPage() {
  const [filteredItems, setFilteredItems] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [boxNumber, setboxNumber] = useState<number | undefined>(undefined);

  const handleSearch = (searchTerm: string) => {
    setIsSearching(true);
    const filteredItems = searchItemHandler(searchTerm, boxNumber);
    if (filteredItems) {
      setFilteredItems(filteredItems);
      setIsSearching(false);
    }
  };

  return (
    <div className="w-full p-4 flex flex-col justify-around">
      <div className="sm:flex flex-row gap-4 max-w-screen-md mx-auto">
        <BoxOption handleChange={(value: number) => setboxNumber(value)} />
        <SearchInput onSearch={handleSearch} />
      </div>
      {isSearching ? (
        <LoadingPulse />
      ) : (
        <div className="flex flex-wrap gap-2 my-16">
          {filteredItems.length > 0 ? (
            filteredItems.map((item: ItemTypes) => (
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
