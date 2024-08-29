import { ChangeEvent } from "react";
import { FormValues } from "@/src/types/interface";
import { UseFormRegister } from "react-hook-form";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { FaWindowClose } from "react-icons/fa";
import limits from "@/src/handlers/general/limits/limits";

interface BodyProps {
  register: UseFormRegister<FormValues>;
  error: string | undefined;
}
const BodyInput = ({ register, error }: BodyProps) => {
  const { formData } = useAppSelector(({ itemState }) => itemState);
  const dispatch = useAppDispatch();

  const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    dispatch(formDataReducer({ body: event.target.value }));
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

  return (
    <div className="relative w-full second-element">
      <textarea
        rows={5}
        dir="auto"
        className="primaryInput !pb-8"
        id="inputBody"
        placeholder="Write a description here..."
        autoComplete="off"
        {...register("body", {
          onChange: handleInputChange,
          required: "Body is required",
          pattern: {
            value: new RegExp(
              `^(?!\\s*$).{${limits.minItemBodyLimit},${limits.maxItemBodyLimit}}$`,
            ),
            message: `Title must be ${limits.minItemBodyLimit}-${limits.maxItemBodyLimit} character`,
          },
        })}
      />
      {formData.body !== "" && (
        <div className="absolute bottom-0 border-t border-gray-200 p-1 bg-white bg-opacity-90 w-full">
          <div className="flex flex-row gap-1 justify-start items-center">
            <FaWindowClose
              onClick={() => dispatch(formDataReducer({ body: "" }))}
              className="text-red-500 text-xl rounded-sm !p-0 hover:font-bold cursor-pointer"
            />
            <p className="text-gray-500">
              {formData.body.length + " / " + limits.maxItemBodyLimit}
            </p>
          </div>
        </div>
      )}
      <p className="text-red-500 text-sm pl-4">{error}</p>
    </div>
  );
};

export default BodyInput;
