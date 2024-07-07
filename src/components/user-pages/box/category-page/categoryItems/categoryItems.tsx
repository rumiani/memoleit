import React, { useEffect } from "react";
import { ItemTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";
import BoxesDropdown from "./boxesDropdown/BoxesDropdown";
import { itemsCategoryIdFilterHandler } from "@/src/handlers/itemsCategoryIdFilterHandler";
import CategoryItem from "@/src/components/general/categoryitem/categoryitem";

export default function CategoryItems() {
  const { category } = useAppSelector((state) => state.categoryState);
  const { items } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    itemsCategoryIdFilterHandler(category.id)
      .then((filteredItemsData: any) => {
        if (!isEmpty(filteredItemsData))
          dispatch(allItemsReducer(filteredItemsData));
      })
      .catch(() => {
        console.log("error");
      });
  }, [dispatch, category]);
  return (
    <div className="flex flex-col justify-around mt-4 gap-2">
      <BoxesDropdown categoryId={category.id} />
      {isEmpty(items) ? (
        <div className="card_message">No item has been found.</div>
      ) : (
        <div className="flex flex-wrap justify-around gap-4 mb-24">
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
