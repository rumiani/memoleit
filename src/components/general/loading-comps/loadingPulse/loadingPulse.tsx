import React from "react";

export default function LoadingPulse() {
  return (
    <div className="animate-pulse border-opacity-30 border border-slate-400 shadow rounded-md p-4 w-full sm:w-72  mx-auto">
      <div className=" flex space-x-4">
        <div className="rounded-full bg-slate-400 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-400 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-400 rounded col-span-2"></div>
              <div className="h-2 bg-slate-400 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-400 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
