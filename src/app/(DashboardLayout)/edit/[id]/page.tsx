"use client";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { FormValues, itemTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";
import EditForm from "@/src/components/itemForm/editForm";

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
      <EditForm id={params.id} itemDefaultValues={formData} />
    </div>
  );
}
