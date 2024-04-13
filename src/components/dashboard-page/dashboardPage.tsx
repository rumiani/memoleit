import React from "react";
import Review from "./review/review";
import Filters from "./filters/filters";

export default function DashboardPage() {
  return (
    <>
      <Filters />
      <Review />
    </>
  );
}
