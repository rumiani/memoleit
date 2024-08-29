import { getCategoriesHandler } from "@/src/handlers/getCategoriesHandler";
import { FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { useLiveQuery } from "dexie-react-hooks";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch } from "@/src/app/hooks";
import limits from "@/src/handlers/general/limits/limits";

export default function ChooseCategory({
  register,
  error,
}: {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}) {
  const categories = useLiveQuery(() => getCategoriesHandler(), [], []);
  const dispatch = useAppDispatch();
  const handleInputChange = (event: { target: { name: any; value: any } }) => {
    const { name, value } = event.target;
    dispatch(formDataReducer({ [name]: value }));
  };
  return (
    <div className="w-full max-w-64 flex flex-col">
      <input
        list="categories"
        id="category"
        autoComplete="off"
        className="third-element  primaryInput !w-full !text-lg !p-1"
        placeholder="Add or choose a category"
        {...register("category", {
          onChange: handleInputChange,
          required: "Category is required",
          pattern: {
            value: new RegExp(
              `^[a-zA-Z0-9\\s\\-]{${limits.minItemcategoryLimit},${limits.maxItemcategoryLimit}}$`,
            ),
            message: "Please enter only a-z, 0-9, - or space.",
          },
          minLength: {
            value: limits.minItemcategoryLimit,
            message: `Input must be ${limits.minItemcategoryLimit}-${limits.maxItemcategoryLimit} characters long`,
          },
          maxLength: {
            value: limits.maxItemcategoryLimit,
            message: `Input must be ${limits.minItemcategoryLimit}-${limits.maxItemcategoryLimit} characters long`,
          },
        })}
      />
      {categories && categories?.length > 0 && (
        <datalist id="categories">
          {categories.map((category) => (
            <option
              className="bg-red-500"
              key={category.name}
              value={category.name}
            />
          ))}
        </datalist>
      )}
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
}
