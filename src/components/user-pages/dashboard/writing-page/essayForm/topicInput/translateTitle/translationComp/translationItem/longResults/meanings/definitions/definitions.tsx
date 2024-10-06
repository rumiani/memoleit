import { MeaningTypes } from "@/src/types/interface";
import Definition from "./definition/definition";

export default function Definitions({translatingItem, meaning }: {translatingItem:String, meaning: MeaningTypes }) {
  return (
    <ul>
      {meaning.definitions.map(({ definition }, i) => (
        <li key={i} className="w-full">
          <Definition translatingItem={translatingItem} definition={definition} />
        </li>
      ))}
    </ul>
  );
}
