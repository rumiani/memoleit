import React from "react";
import Review from "./review/review";
import Filters from "./filters/filters";

import NextClosest from "./review/noResult/nextClosest/nextClosest";

export default function DashboardPage() {
  return (
    <>
      <Filters />
      <Review />
    </>
  );
}
