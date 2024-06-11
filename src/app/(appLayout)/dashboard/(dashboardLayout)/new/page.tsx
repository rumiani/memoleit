"use client";

import React from "react";
import NewItemForm from "@/src/components/itemForm/newItemForm";
import JoyrideNewItem from "@/src/components/joyrides/newItemJoyride";

const NewPage = () => {
  return (
    <div>
      <JoyrideNewItem/>
      <NewItemForm />
    </div>
  );
};

export default NewPage;
