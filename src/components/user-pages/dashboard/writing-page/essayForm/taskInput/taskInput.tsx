import { EssayValues, FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import limits from "@/src/handlers/general/limits/limits";
import { useState } from "react";
import { essayFormDataReducer } from "@/src/redux/slices/essayStateSlice";
import { essayOptions } from "@/src/data/essay/essayOptions";

export default function TaskInput({
  register,
  error,
}: {
  register: UseFormRegister<EssayValues>;
  error: string | undefined;
}) {
  const { body, topic, task } = useAppSelector(
    (state) => state.essayState.essay,
  );
  const dispatch = useAppDispatch();
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    dispatch(essayFormDataReducer({ task: event.target.value }));
  };
  return (
    <div className="w-24 flex flex-col">
      <div className="flex flex-col gap-2 justify-between items-center">
        <select
          className="w-24 p-2 border border-gray-100 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          id="categories"
          value={task}
          {...register("task", {
            onChange: handleInputChange,
          })}
        >
          {essayOptions.tasks.map((task) => {
            return (
              <option className="bg-red-500" key={task.name} value={task.value}>
                {task.name}
              </option>
            );
          })}
        </select>

        <p className="text-center w-24 text-sm text-gray-500">
          {task === "1" ? "150 words" : "250 words"}
        </p>
      </div>
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
}
