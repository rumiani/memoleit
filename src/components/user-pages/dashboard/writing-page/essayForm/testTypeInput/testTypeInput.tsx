import { EssayValues, FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import limits from "@/src/handlers/general/limits/limits";
import { useState } from "react";
import { essayFormDataReducer } from "@/src/redux/slices/essayStateSlice";
import { essayOptions } from "@/src/data/essay/essayOptions";

export default function TestTypeInput({
  register,
  error,
}: {
  register: UseFormRegister<EssayValues>;
  error: string | undefined;
}) {
  const { body, topic, task, type } = useAppSelector(
    (state) => state.essayState.essay,
  );
  const dispatch = useAppDispatch();
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    dispatch(essayFormDataReducer({ type: event.target.value }));
  };
  return (
    <div className="w-full max-w-24  flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <select
          className="w-full p-2 border border-gray-100 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          id="categories"
          value={type}
          {...register("type", {
            onChange: handleInputChange,
          })}
        >
          {essayOptions.types.map((type) => {
            return (
              <option className="bg-red-500" key={type.name} value={type.value}>
                {type.name}
              </option>
            );
          })}
        </select>
      </div>
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
}
