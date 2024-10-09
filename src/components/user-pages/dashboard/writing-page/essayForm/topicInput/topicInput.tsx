import { EssayValues } from "@/src/types/interface";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import limits from "@/src/handlers/general/limits/limits";
import { essayFormDataReducer } from "@/src/redux/slices/essayStateSlice";
import { ChangeEvent, useEffect } from "react";

interface TopicProps {
  register: UseFormRegister<EssayValues>;
  error: string | undefined;
}
const TopicInput = ({ register, error }: TopicProps) => {
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(essayFormDataReducer({ topic: event.target.value }));
  };

  return (
    <div className="relative w-full">
      <textarea
        rows={3}
        dir="auto"
        id="inputTopic"
        placeholder="Write a topic for your essay..."
        autoComplete="off"
        className="primaryInput max-w-3xl mx-auto !pb-8 !shadow-xl shadow-gray-800"
        {...register("topic", {
          onChange: handleInputChange,
          required: "Topic is required",
          pattern: {
            value: new RegExp(
              `^(?!\\s*$).{${limits.minTopicTitleLimit},${limits.maxTopicTitleLimit}}$`,
            ),
            message: `Topic must be ${limits.minTopicTitleLimit}-${limits.maxTopicTitleLimit} character`,
          },
        })}
      />
      <p className="text-red-500 text-sm  pl-4">{error}</p>
    </div>
  );
};

export default TopicInput;
