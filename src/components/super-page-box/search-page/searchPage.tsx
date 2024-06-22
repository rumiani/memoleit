"use client";
import React, { useState } from "react";
import SearchInput from "./searchInput/searchInput";
import { ItemTypes } from "@/src/types/interface";
import { db } from "@/src/services/db";
import LoadingPulse from "../../general/loading-comps/loadingPulse/loadingPulse";
import CategoryItem from "../../general/categoryitem/categoryitem";

export default function SearchPage() {
  const [resultItems, setResultItems] = useState<ItemTypes[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchTerm: string) => {
    setIsSearching(true);
    try {
      const resultItems = await db.items
        .filter((item) =>
          item.title.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .toArray();
      setResultItems(resultItems!);
      setIsSearching(false);
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
        <div>
          {resultItems &&
            (resultItems!.length > 0 ? (
              <div>
                <div className="m-4 w-24">
                  Results:{" "}
                  <p className="font-bold inline">{resultItems?.length}</p>
                </div>
                <div></div>
                <div className="flex flex-wrap gap-2 my-16">
                  {resultItems!.map((item: ItemTypes) => (
                    <CategoryItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-red-500 text-center px-4 my-16">
                No items found with this search term.
              </p>
            ))}
        </div>
      )}
    </div>
  );
}
