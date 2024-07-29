import React from "react";
import { ItemTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import { useAppSelector } from "@/src/app/hooks";
import BoxesDropdown from "./boxesDropdown/BoxesDropdown";
import CategoryItem from "@/src/components/general/categoryitem/categoryitem";

export default function CategoryItems() {
  const { category } = useAppSelector((state) => state.categoryState);
  const { items } = useAppSelector((state) => state.itemState);

  return (
    <div className="flex flex-col justify-around mt-4 gap-2">
      <BoxesDropdown categoryId={category.id} />
      {isEmpty(items) ? (
        <div className="card_message">No item has been found.</div>
      ) : (
        <div className="flex flex-wrap justify-around gap-4 mb-24">
          {items.map((item: ItemTypes) => (
            <div key={item.id}>
              <CategoryItem item={item} />{" "}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
