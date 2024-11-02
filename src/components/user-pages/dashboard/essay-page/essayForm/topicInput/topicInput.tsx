import { EssayFormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import limits from "@/src/handlers/general/limits/limits";

interface TopicProps {
  register: UseFormRegister<EssayFormValues>;
  error: string | undefined;
}
const TopicInput = ({ register, error }: TopicProps) => {
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
