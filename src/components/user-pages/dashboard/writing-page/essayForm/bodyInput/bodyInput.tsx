import { ChangeEvent } from "react";
import { EssayValues, FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { FaWindowClose } from "react-icons/fa";
import limits from "@/src/handlers/general/limits/limits";
import { essayFormDataReducer } from "@/src/redux/slices/essayStateSlice";

interface EssayProps {
  register: UseFormRegister<EssayValues>;
  error: string | undefined;
}
export default function BodyInput({ register, error }: EssayProps) {
  const { essay } = useAppSelector((state) => state.essayState);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(essayFormDataReducer({ body: event.target.value }));
    // event.target.style.height = "auto";
    // event.target.style.height = event.target.scrollHeight + 40 + "px";
    // if (event.target.value === "") event.target.style.height = 200 + "px";
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        <textarea
          className="primaryInput max-w-3xl mx-auto !pb-8 !shadow-lg shadow-gray-800"
          id="inputEssay"
          placeholder="Write an essay here..."
          autoComplete="off"
          rows={5}
          dir="auto"
          {...register("body", {
            onChange: handleInputChange,
            required: "Body is required",
            validate: (body) => {
              if (essay.task === "1") {
                return (
                  body.split(" ").length > 150 ||
                  "Essay must be at least 150 words."
                );
              } else {
                return (
                  body.split(" ").length > 250 ||
                  "Essay must be at least 250 words."
                );
              }
            },
            pattern: {
              value: new RegExp(
                `^\\S(.|\\s){${limits.minEssayLimit - 1},${limits.maxEssayLimit - 1}}\\S$`,
              ),
              message: `Essay must be betwen ${limits.minEssayLimit}-${limits.maxEssayLimit} character`,
            },
          })}
        />
        {essay.body !== "" && (
          <div className="absolute bottom-0 flex flex-row justify-between border-t border-gray-200 p-1 bg-white bg-opacity-90 w-full">
            <div className="flex flex-row gap-1 justify-start items-center">
              <FaWindowClose
                onClick={() => dispatch(essayFormDataReducer({ body: "" }))}
                className="text-red-500 text-xl rounded-sm !p-0 hover:font-bold cursor-pointer"
              />
              <p className="text-gray-500">
                {essay.body.length + " / " + limits.maxEssayLimit}
              </p>
            </div>
            <p className="text-gray-500">
              {essay.body.split(" ").length} words
            </p>
          </div>
        )}
      </div>
      <p className="text-red-500 text-sm p-2">{error}</p>
    </div>
  );
}
