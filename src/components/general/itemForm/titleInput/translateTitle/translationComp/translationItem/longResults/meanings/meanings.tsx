import { LookUpResultTypes } from "@/src/types/interface";
import Definitions from "./definitions/definitions";
import { capitalize, isEmpty } from "lodash";

export default function Meanings({translatingItem, result }: {translatingItem:String, result: LookUpResultTypes }) {
  return (
    <ul>
      {result.meanings.map((meaning, i) => (
        <ul key={i} className="flex flex-col gap-2">
          <strong>- {capitalize(meaning.partOfSpeech)}</strong>
          <Definitions meaning={meaning} translatingItem={translatingItem}/>
          {!isEmpty(meaning.synonyms) && (
            <>
              <strong>Synonyms:</strong>
              {meaning.synonyms.map((synonym, i) => (
                <div key={i}>{capitalize(synonym)}</div>
              ))}
            </>
          )}
          {!isEmpty(meaning.antonyms) && (
            <>
              <strong>Antonyms:</strong>
              {meaning.antonyms.map((antonym, i) => (
                <div key={i}>{capitalize(antonym)}</div>
              ))}
            </>
          )}
        </ul>
      ))}
    </ul>
  );
}
