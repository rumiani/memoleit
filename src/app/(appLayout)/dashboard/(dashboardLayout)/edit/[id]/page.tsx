"use client";
import EditItemForm from "@/src/components/itemForm/editItemForm";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { FormValues, itemTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";

export default function Item({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<FormValues | undefined>(undefined);
  useEffect(() => {
    const appData = getAppDataHandler();
    const item = appData.itemsData.find(
      (item: itemTypes) => item.id === params.id
    );
    setFormData({
      title: item.title,
      body: item.body,
      category: item.category,
    });
  }, [params]);
  return (
    <div>
      <EditItemForm id={params.id} itemDefaultValues={formData} />
    </div>
  );
}
