"use client";
import Link from "next/link";
import React, { useState } from "react";

export default function Progress() {
  const [openId, setOpenId] = useState<number | null>(null);
  const opendAnswerHandler = (id: number) => {
    setOpenId(id === openId ? null : id);
  };
  return (
    <>
      <div className="max-w-lg mx-auto m-4 p-4">
        progress page
      </div>
    </>
  );
}
