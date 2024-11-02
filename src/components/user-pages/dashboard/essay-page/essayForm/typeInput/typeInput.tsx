import { EssayFormValues } from "@/src/types/interface";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { essayOptions } from "@/src/data/essay/essayOptions";

export default function TypeInput({
  register,
  watch,
}: {
  register: UseFormRegister<EssayFormValues>;
  watch: UseFormWatch<EssayFormValues>;
}) {
  const typeText = watch("type");
  return (
    <div className="w-full max-w-24  flex flex-col">
      <div className="flex flex-row justify-between items-center">
        <select
          className="w-full p-2 border border-gray-100 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          id="categories"
          value={typeText}
          {...register("type")}
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
    </div>
  );
}
