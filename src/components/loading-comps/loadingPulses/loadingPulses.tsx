import React from "react";
import LoadingPulse from "../loadingPulse/loadingPulse";

export default function LoadingPulses() {
  return (
    <div className="flex flex-wrap gap-2">
      <LoadingPulse />
      <LoadingPulse />
      <LoadingPulse />
    </div>
  );
}
