"use client";
import EditItemForm from "@/src/components/itemForm/editItemForm";
import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import notFoundError from "@/src/handlers/notFoundError";
import { db } from "@/src/services/db";
import { FormValues, ItemTypes } from "@/src/types/interface";
import React, { useEffect, useState } from "react";

export default function Item({ params }: { params: { id: string } }) {
  const [formData, setFormData] = useState<FormValues | undefined>(undefined);
  useEffect(() => {
    console.log(params.id);
    db.items
      .get(params.id)
      .then((item) => {
        if (!item) throw notFoundError("404");
        setFormData({
          title: item.title,
          body: item.body,
          category: item.category,
          categoryId:item.categoryId,
        });
      })
      .catch(() => {
        console.log(Error);
      });
  
  }, [params]);
  return (
    <div>
      <EditItemForm id={params.id} itemDefaultValues={formData} />
    </div>
  );
}
