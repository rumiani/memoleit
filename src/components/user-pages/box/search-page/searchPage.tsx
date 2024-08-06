"use client";
import { useEffect, useState } from "react";
import SearchInput from "./searchInput/searchInput";
import { db } from "@/src/services/db";
import LoadingPulse from "@/src/components/general/loading-comps/loadingPulse/loadingPulse";
import { useSearchParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";
import { isEmpty } from "lodash";
import SearchResult from "./searchResult/searchResult";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.toString().trim().substring(2);
  const { items } = useAppSelector((state) => state.itemState);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useAppDispatch();

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
      } catch (error) {
        console.error("Error fetching items:", error);
      } finally {
        setIsSearching(false);
      }
    };
    handleSearch();
  }, [searchTerm, dispatch]);

  return (
    <div className="w-full p-4 flex flex-col justify-around">
      <SearchInput searchTerm={searchTerm} />
      {!isEmpty(searchTerm) && (
        <div>
          {isSearching ? (
            <div className="my-24">
              <LoadingPulse />
            </div>
          ) : (
            <SearchResult items={items} />
          )}
        </div>
      )}
    </div>
  );
}
