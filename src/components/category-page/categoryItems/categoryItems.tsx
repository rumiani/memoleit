import React, { useEffect } from "react";
import { ItemTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { categoryFilterHandler } from "@/src/handlers/categoryFilterHandler";
import CategoryItem from "../../categoryitem/categoryitem";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";

export default function CategoryItems({ categoryName }: { categoryName: string }) {
  const { items } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const filteredItemsData = categoryFilterHandler(categoryName);
    if ( !isEmpty(filteredItemsData))
      dispatch(allItemsReducer(filteredItemsData));
  }, [ dispatch, categoryName]);
  return (
    <div className="flex flex-wrap justify-around mt-8 gap-2">
      {isEmpty(items) ? (
        <div className="card_message">{categoryName} category is empty.</div>
      ) : (
        <div className="flex flex-wrap justify-around gap-4 mb-16">
          {items.map((item: ItemTypes) => {
            return (
              <div key={item.id}>
                <CategoryItem item={item} />{" "}
              </div>
            );
          })} 
        </div>
      )}
    </div>
  );
}
