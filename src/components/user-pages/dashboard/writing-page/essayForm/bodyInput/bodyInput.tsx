import { EssayValues } from "@/src/types/interface";
import { UseFormRegister, UseFormWatch } from "react-hook-form";
import { useAppDispatch } from "@/src/app/hooks";
import { FaWindowClose } from "react-icons/fa";
import limits from "@/src/handlers/general/limits/limits";
import { essayFormDataReducer } from "@/src/redux/slices/essayStateSlice";

interface EssayProps {
  register: UseFormRegister<EssayValues>;
  error: string | undefined;
  watch: UseFormWatch<EssayValues>;
}
export default function BodyInput({ register, error, watch }: EssayProps) {
  const dispatch = useAppDispatch();
  const bodyText = watch("body");
  const essayTask = watch("task");
  const validateBody = (bodyText: string) => {
    const minWordCount = essayTask === "one" ? 150 : 250;
    return (
      bodyText.split(" ").length > minWordCount ||
      `Essay must be at least ${minWordCount} words.`
    );
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
            required: "Body is required",
            validate: validateBody,
            pattern: {
              value: new RegExp(
                `^\\S(.|\\s){${limits.minEssayLimit - 1},${limits.maxEssayLimit - 1}}\\S$`,
              ),
              message: `Essay must be betwen ${limits.minEssayLimit}-${limits.maxEssayLimit} character`,
            },
          })}
        />
        {bodyText !== "" && (
          <div className="absolute bottom-0 flex flex-row justify-between border-t border-gray-200 p-1 bg-white bg-opacity-90 w-full">
            <div className="flex flex-row gap-1 justify-start items-center">
              <FaWindowClose
                onClick={() => dispatch(essayFormDataReducer({ body: "" }))}
                className="text-red-500 text-xl rounded-sm !p-0 hover:font-bold cursor-pointer"
              />
              <p className="text-gray-500">
                {bodyText.length + " / " + limits.maxEssayLimit}
              </p>
            </div>
            <p
              className={`${validateBody(bodyText) ? "text-gray-500" : "text-red-500"} `}
            >
              {bodyText.split(" ").length} words
            </p>
          </div>
        )}
      </div>
      <p className="text-red-500 text-sm p-2">{error}</p>
    </div>
  );
}
