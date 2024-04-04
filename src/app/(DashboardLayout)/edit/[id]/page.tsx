"use client";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { itemTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";
import ItemForm from "@/src/components/itemForm/itemForm";

export default function Item({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState();
  useEffect(() => {
    const appData = getAppDataHandler();
    const editingItem = appData.itemsData.filter(
      (item: itemTypes) => item.id === params.id
    );
    setFormData(editingItem);
  }, [params]);
  return <div>
          <ItemForm defaultValues={formData}/>
  </div>;
}
