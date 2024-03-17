"use client";
import React, { useEffect, useState } from "react";
import words from '@/data/11plus.json'
// import words from "@/data/4.json";
import storeToLocal from "./storeToLocal";
import { item } from "@/types/interface";
import { reviewHandler } from "@/handlers/reviewHandler";
import { randomItemHandler } from "@/handlers/randomItemHandler";
import { learnedHandler } from "@/handlers/learnedHandler";
import Item from "./item/item";

export default function Review() {
  const [item, setItem] = useState<item>();
  const [days, setDays] = useState<number>(0);

  useEffect(() => {
    const storedItems = storeToLocal(words);
    const randomItem = randomItemHandler(storedItems);
    setItem(randomItem);
    if (randomItem) {
      const days = reviewHandler(randomItem.createdAt).days;
      setDays(days);
    }
  }, []);

  const goToNextItem = (item: item, status: boolean) => {    
    const newRandomItem = learnedHandler(item, status);
    setItem(newRandomItem);
  };

  return (
    <div className="word-box border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-80 mx-auto mt-10">
      {item?
    <Item item={item} days={days} goToNextItem={goToNextItem} />
    :
    <p className="text-red-500">There is no item to review.</p>  
    }
    </div>
  );
}
