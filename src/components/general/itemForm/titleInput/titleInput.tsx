import { FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import { db } from "@/src/services/db";
import { usePathname } from "next/navigation";
import TranslateTitle from "./translateTitle/translateTitle";
import { isEditPage } from "@/src/handlers/general/isPage";
import { toLower } from "lodash";
import limits from "@/src/handlers/general/limits/limits";

interface TitleProps {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}
const TitleInput = ({ register, error }: TitleProps) => {
  const path = usePathname();
  const dispatch = useAppDispatch();

  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    dispatch(formDataReducer({ [name]: value }));
  };

  return (
    <div className="relative w-full">
      <input
        dir="auto"
        id="inputTitle"
        className="first-element primaryInput !pr-12"
        placeholder="Write a title here..."
        autoComplete="off"
        type="text"
        {...register("title", {
          onChange: handleInputChange,
          required: "Title is required",
          validate: async (title: string) => {
            const itemsWithThisTitle = await db.items
              .where({ title: toLower(title) })
              .toArray();
            if (isEditPage(path)) {
              return itemsWithThisTitle.length > 2
                ? "Title already exists."
                : true;
            } else {
              return itemsWithThisTitle.length > 0
                ? "Title already exists."
                : true;
            }
          },
          pattern: {
            value: new RegExp(
              `^(?!\\s*$).{${limits.minTitleLimit},${limits.maxTitleLimit}}$`,
            ),
            message: `Title must be ${limits.minTitleLimit}-${limits.maxTitleLimit} character`,
          },
        })}
      />
      <p className="text-red-500 text-sm  pl-4">{error}</p>
      <TranslateTitle />
    </div>
  );
};

export default TitleInput;
