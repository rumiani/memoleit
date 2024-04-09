import { getAppDataHandler } from "@/src/handlers/getAppDataHandler";
import { FormValues, categoryTypes } from "@/src/types/interface";
import { isEmpty } from "lodash";
import React, { useEffect, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export default function ChooseTopic({ register, error }:{register: UseFormRegister<FormValues>, error: string | undefined}) {
  const [topics, setTopics] = useState<categoryTypes[]>([]);
  useEffect(() => {
    const { catagories } = getAppDataHandler();
    console.log(catagories);
    
    if (!topics) setTopics(catagories);
  }, [topics]);

  return (
    <div className="min-w-64 max-w-80 my-4 flex flex-col">
      {/* <label htmlFor="topic" className="text-gray-500"></label> */}
      <input
        list="topics"
        id="topic"
        autoComplete="off"
        className="outline-none p-1 focus:bg-gray-100 transition-all duration-300"
        // value={value}
        // onChange={(e) => changeHandler(e)}
        placeholder="Add a topic or Choose one from the list ..."
        {...register("topic", {
          required: "Topic is required",
          pattern: {
            value: /^.{3,100}$/,
            message: "Topic must be 3-100 character",
          },
        })}
      />
      <datalist id="topics">
        {
          topics.map((topic) => {
            return <option key={topic.name} value={topic.name} />;
          })}
      </datalist>
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
}
