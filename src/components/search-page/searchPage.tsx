"use client";
import React, { useState } from "react";
import SearchInput from "./searchInput/searchInput";
import CategoryItem from "../categoryitem/categoryitem";
import BoxOption from "./boxOption/boxOption";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";
import { ItemTypes } from "@/src/types/interface";
import { searchItemHandler } from "./handlers/searchItemHandler";

export default function SearchPage() {
  const [filteredItems, setFilteredItems] = useState<ItemTypes[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [boxNumber, setboxNumber] = useState<number | undefined>(undefined);

  const handleSearch = async (searchTerm: string) => {
    setIsSearching(true);
    try {
      const filteredItems = await searchItemHandler(searchTerm, boxNumber);
      setFilteredItems(filteredItems!);
      setIsSearching(false);
    } catch (error) {}
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
            <p className="text-red-500 mx-auto px-4 my-16">
              No items found with this search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
