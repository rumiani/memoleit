import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { categoryTypes } from "@/src/types/interface";
import React from "react";

export default function SelectCategory() {
  const { categories } = getAppDataHandler();
  return (
    <div className="grid">
      <select className="appearance-none row-start-1 col-start-1 bg-slate-50 dark:bg-slate-800 ...">
        <option>All</option>
        {categories.map((category: categoryTypes) => {
          return <option key={category.id}>{category.name}</option>;
        })}
      </select>
      <svg className="pointer-events-none row-start-1 col-start-1 ..."></svg>
    </div>
  );
}
