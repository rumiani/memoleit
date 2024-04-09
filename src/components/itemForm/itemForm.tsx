import { DevTool } from "@hookform/devtools";
import React, { useState } from "react";
import TitleInput from "./titleInput/titleInput";
import Preview from "./preview/preview";
import { useForm } from "react-hook-form";
import RichTextEditor from "./richTexhEditor/RichTextEditor";
import ChooseTopic from "./chooseTopic/chooseTopic";
import CreatedMessage from "./CreatedMessage/CreatedMessage";
import { saveNewItemToLocal } from "@/src/handlers/saveNewItemHandler";
import { FormValues } from "@/src/types/interface";

interface Props {
  defaultValues?: FormValues; // Make defaultValues prop optional
}
const ItemForm: React.FC<Props> = ({
  defaultValues = { title: "", body: "", category: "" },
}) => {
  const [createdMessage, setCreatedMessage] = useState(false);

  const form = useForm<FormValues>({
    defaultValues,
    mode: "onBlur",
  });

  const {
    register,
    control,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const submitHandler = (item: FormValues) => {
    saveNewItemToLocal(item);
  };

  if (isSubmitSuccessful) {
    setCreatedMessage(true);
    reset();
  }
  return (
    <>
      {createdMessage ? (
        <CreatedMessage newItemHandler={() => setCreatedMessage(false)} />
      ) : (
        <div>
          <form
            className="bg-white rounded-xl p-2 md:p-4 flex flex-col justify-center"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
          >
            <TitleInput register={register} error={errors.title?.message} />
            <RichTextEditor
              error={errors.body?.message}
              register={register}
              setValue={setValue}
            />
            <ChooseTopic register={register} error={errors.category?.message} />
            <button className="primaryBtn mx-auto">publish</button>
            {/* <DevTool control={control} placement="top-right" /> */}
          </form>
          <Preview getValues={getValues} />
        </div>
      )}
    </>
  );
};

export default ItemForm;
