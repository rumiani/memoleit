import { LookUpResultTypes } from "@/src/types/interface";
import React from "react";
import Definitions from "./definitions/definitions";
import { capitalize, isEmpty } from "lodash";

export default function Meanings({
  result,
  setDialogOpen,
}: {
  result: LookUpResultTypes;
  setDialogOpen: Function;
}) {
  return (
    <ul>
      {result.meanings.map((meaning, i) => {
        return (
          <ul key={i} className="flex flex-col gap-2">
            <strong>- {capitalize(meaning.partOfSpeech)}</strong>
            <Definitions meaning={meaning} setDialogOpen={setDialogOpen} />
            {!isEmpty(meaning.synonyms) && (
              <>
                <strong>Synonyms:</strong>
                {meaning.synonyms.map((synonym, i) => {
                  return <div key={i}>{capitalize(synonym)}</div>;
                })}
              </>
            )}
            {!isEmpty(meaning.antonyms) && (
              <>
                <strong>Antonyms:</strong>
                {meaning.antonyms.map((antonym, i) => {
                  return <div key={i}>{capitalize(antonym)}</div>;
                })}
              </>
            )}
          </ul>
        );
      })}
    </ul>
  );
}
