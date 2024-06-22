import React from "react";
import Sounds from "./sounds/sounds";
import LeitnerTextSelectionMode from "./leitnerTextSelectionMode/leitnerTextSelectionMode";
export default function AppSettingsPage() {
  return (
    <div className="w-full max-w-xl mx-auto my-4 sm:my-8 p-4 border border-gray-300">
      <Sounds />
      <LeitnerTextSelectionMode />
    </div>
  );
}
