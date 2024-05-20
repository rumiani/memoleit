import React, { useEffect } from "react";
import { CategoryTypes, ItemTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import CategoryItem from "../../categoryitem/categoryitem";
import { allItemsReducer } from "@/src/redux/slices/itemStateSlice";
import BoxesDropdown from "./boxesDropdown/BoxesDropdown";
import { itemsCategoryIdFilterHandler } from "@/src/handlers/itemsCategoryIdFilterHandler";
import { db } from "@/src/services/db";

export default function CategoryItems({ categoryId }: { categoryId: string }) {
  const { items } = useAppSelector((state) => state.itemState);
  const dispatch = useAppDispatch();

  useEffect(() => {
    itemsCategoryIdFilterHandler(categoryId)
      .then((filteredItemsData: any) => {
        console.log(filteredItemsData);

        console.log(filteredItemsData);
        if (!isEmpty(filteredItemsData))
          dispatch(allItemsReducer(filteredItemsData));
      })
      .catch(() => {
        console.log("error");
      });
  }, [dispatch, categoryId]);
  return (
    <div className="flex flex-col justify-around mt-8 gap-2">
      <BoxesDropdown categoryId={categoryId} />
      {isEmpty(items) ? (
        <div className="card_message">No item has been found.</div>
      ) : (
        <div>
          <div className="flex flex-wrap justify-around gap-4 mb-16">
            {items.map((item: ItemTypes) => {
              return (
                <div key={item.id}>
                  <CategoryItem item={item} />{" "}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
