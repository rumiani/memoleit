"use client";

import React from "react";
import NewItemForm from "@/src/components/itemForm/newItemForm";
import JoyrideNewItem from "@/src/components/joyrides/newItemJoyride";

const Index = () => {
  return (
    <div>
      <JoyrideNewItem/>
      <NewItemForm />
    </div>
  );
};

export default Index;
