import { EssayValues, FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import { usePathname } from "next/navigation";
import { toLower } from "lodash";
import limits from "@/src/handlers/general/limits/limits";
import appPages from "@/src/data/appPages/appPages";

interface TopicProps {
  register: UseFormRegister<EssayValues>;
  error: string | undefined;
}
const TopicInput = ({ register, error }: TopicProps) => {
  const path = usePathname();
  const dispatch = useAppDispatch();

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    dispatch(formDataReducer({ [name]: value }));
  };

  return (
    <div className="relative w-full">
      <textarea
        rows={1}
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
