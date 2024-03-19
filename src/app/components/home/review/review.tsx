"use client";
import React, { useEffect, useState } from "react";
import words_11plus  from "@/src/data/11plus.json";
import words_test from "@/src/data/4.json";
import storeToLocal from "./storeToLocal";
import { item } from "@/src/types/interface";
import { reviewHandler } from "@/src/handlers/reviewHandler";
import { randomItemHandler } from "@/src/handlers/randomItemHandler";
import { learnedHandler } from "@/src/handlers/learnedHandler";
import Item from "./item/item";
console.log(process.env.NODE_ENV);
let words: string[];
if (process.env.NODE_ENV === "development") {
  words = words_test;
} else {
  words = words_11plus;
}

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
    <div className="word-box border border-gray-300 rounded-lg p-6 flex flex-col justify-between w-full sm:w-80 mx-auto mt-10">
      {item ? (
        <Item item={item} days={days} goToNextItem={goToNextItem} />
      ) : (
        <p className="text-red-500">There is no item to review.</p>
      )}
    </div>
  );
}
