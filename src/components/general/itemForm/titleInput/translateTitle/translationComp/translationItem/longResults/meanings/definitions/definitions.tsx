import React from "react";
import { MeaningTypes } from "@/src/types/interface";
import Definition from "./definition/definition";

export default function Definitions({ meaning }: { meaning: MeaningTypes }) {
  return (
    <ul>
      {meaning.definitions.map(({ definition }, i) => (
        <li key={i} className="w-full">
          <Definition definition={definition} />
        </li>
      ))}
    </ul>
  );
}
