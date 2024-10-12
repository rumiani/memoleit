import { EssayValues } from "@/src/types/interface";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { essayOptions } from "@/src/data/essay/essayOptions";

export default function TaskInput({
  register,
  watch,
}: {
  register: UseFormRegister<EssayValues>;
  watch: UseFormWatch<EssayValues>;
}) {
  const taskText = watch("task");

  return (
    <div className="w-24 flex flex-col">
      <div className="flex flex-col gap-2 justify-between items-center">
        <select
          className="w-24 p-2 border border-gray-100 rounded-md focus:outline-none focus:border-blue-500 bg-gray-100 text-gray-800"
          id="categories"
          value={taskText}
          {...register("task")}
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
          {taskText === "1" ? "150 words" : "250 words"}
        </p>
      </div>
    </div>
  );
}
