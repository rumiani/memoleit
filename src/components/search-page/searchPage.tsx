"use client";
import React, { useState } from "react";
import SearchInput from "./searchInput/searchInput";
import CategoryItem from "../categoryitem/categoryitem";
import LoadingPulse from "../loading-comps/loadingPulse/loadingPulse";
import { ItemTypes } from "@/src/types/interface";
import { db } from "@/src/services/db";

export default function SearchPage() {
  const [resultItems, setResultItems] = useState<ItemTypes[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    setIsSearching(true);
    try {
      const resultItems = await db.items
        .filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .toArray();
      setResultItems(resultItems!);
      setIsSearching(false);
      console.log(searchTerm);
      
    } catch (error) {
      console.log("Error");
    }
  };

  return (
    <div className="w-full p-4 flex flex-col justify-around">
      <SearchInput onSearch={handleSearch} />
      {isSearching ? (
        <div className="my-24">
          <LoadingPulse />
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 my-16">
          {resultItems &&
            (resultItems!.length > 0 ? (
              resultItems!.map((item: ItemTypes) => (
                <CategoryItem key={item.id} item={item} />
              ))
            ) : (
              <p className="text-red-500 mx-auto px-4 my-16">
                No items found with this search term.
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
