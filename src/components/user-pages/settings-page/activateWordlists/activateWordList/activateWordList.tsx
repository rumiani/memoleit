import CheckboxInput from "@/src/components/general/checkBoxInput/input";
import { db } from "@/src/services/db";
import { wordListTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { FaDownload } from "react-icons/fa";
import { toast } from "react-toastify";

export default function ActivateWordList({
  wordList,
  setWordLists,
}: {
  wordList: wordListTypes;
  setWordLists: Function;
}) {
  const [status, setStatus] = useState<boolean>(wordList.status);

  const downloadWordListHandler = async (listName: string) => {
    try {
      const response = await fetch("/api/wordlist/" + listName);
      const data = await response.json();
      const setting = await db.setting.where("name").equals("setting").first();
      const foundWordList = setting?.wordLists.find(
        (wordList) => wordList.name === listName,
      );

      foundWordList?.words.push(...data.words);
      await db.setting.put(setting!);
      setWordLists(setting?.wordLists!);
    } catch (error) {
      console.error("Error fetching user count:", error);
    }
  };
  const handleInputChange = async (listName: string) => {
    try {
      const setting = await db.setting.where("name").equals("setting").first();
      const foundWordList = setting?.wordLists.find(
        (wordList) => wordList.name === listName,
      );
      if (foundWordList) foundWordList.status! = !foundWordList?.status;
      await db.setting.put(setting!);
      setStatus(!status);
      if (status) {
        toast.success(listName + " has been removed from your study wordsList");
      } else {
        toast.success(listName + " has been added to your study wordsList");
      }
    } catch (error) {}
  };
  return (
    <>
      {isEmpty(wordList.words) ? (
        <button
          onClick={() => downloadWordListHandler(wordList.name)}
          className="primaryBtn flex justify-between gap-2"
        >
          <span>{wordList.lable}</span>
          <FaDownload />
        </button>
      ) : (
        <CheckboxInput
          value={wordList.name}
          status={status}
          handleInputChange={() => handleInputChange(wordList.name)}
        />
      )}
    </>
  );
}
