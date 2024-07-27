"use client";
import React, { useEffect, useState } from "react";
import SearchInput from "./searchInput/searchInput";
import { ItemTypes } from "@/src/types/interface";
import { db } from "@/src/services/db";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import CategoryItem from "@/src/components/general/categoryitem/categoryitem";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { toast } from "react-toastify";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.toString().trim().substring(2);
  console.log(searchTerm);

  const { items } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.length === 0) return dispatch(allItemsReducer([]));
      setIsSearching(true);
      try {
        const resultItems = await db.items
          .filter((item) =>
            item.title.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .toArray();
        dispatch(allItemsReducer(resultItems));
        setIsSearching(false);
      } catch (error) {
        console.log("Error");
      }
    };
    handleSearch();
  }, [searchTerm, dispatch]);

  return (
    <div className="w-full p-4 flex flex-col justify-around">
      <SearchInput searchTerm={searchTerm} />
      {isSearching ? (
        <div className="my-24">
          <LoadingPulse />
        </div>
      ) : (
        <div>
          {items!.length > 0 ? (
            <div>
              <div className="m-4 w-24">
                Results: <p className="font-bold inline">{items?.length}</p>
              </div>
              <div></div>
              <div className="flex flex-wrap gap-2 my-16">
                {items!.map((item: ItemTypes) => (
                  <CategoryItem key={item.id} item={item} />
                ))}
              </div>
            </div>
          ) : (
            <p className="text-red-500 text-center px-4 my-16">
              No items found with this search term.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
