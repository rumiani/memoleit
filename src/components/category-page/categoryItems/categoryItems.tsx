import React, { useEffect } from "react";
import { itemTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { categoryFilterHandler } from "@/src/handlers/categoryFilterHandler";
import { allItemsReducer } from "@/src/redux/appStateSlice";
import CategoryItem from "../../categoryitem/categoryitem";

export default function CategoryItems({ category }: { category: string }) {
  const { items } = useAppSelector((state) => state.appState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredItemsData = categoryFilterHandler(category);
    if (isEmpty(items) && !isEmpty(filteredItemsData))
      dispatch(allItemsReducer(filteredItemsData));
  }, [items, dispatch, category]);
  return (
    <div className="flex flex-wrap justify-around mt-8 gap-2">
      {isEmpty(items) ? (
        <div className="card_message">{category} is empty.</div>
      ) : (
        <div className="flex flex-wrap justify-around gap-4 mb-16">
          {items.map((item: itemTypes) => (
            <div key={item.id}>
              <CategoryItem item={item} />{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
