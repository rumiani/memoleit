import { DevTool } from "@hookform/devtools";
import React, { useState } from "react";
import TitleInput from "./titleInput/titleInput";
import Preview from "./preview/preview";
import { useForm } from "react-hook-form";
import RichTextEditor from "./richTexhEditor/RichTextEditor";
import ChooseTopic from "./chooseTopic/chooseTopic";
import CreatedMessage from "../form_components/CreatedMessage/CreatedMessage";
import { saveNewItemToLocal } from "@/src/handlers/saveNewItemHandler";

type FormValues = {
  title: string;
  body: string;
  topic: string;
};
const ItemForm = ({defaultValues}:FormValues = { title: "", body: "", topic: "" } ) => {
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
    console.log("Submit Successful");
    setCreatedMessage(true);
    reset();
  }
  return (
    <>
      {createdMessage ? (
        <CreatedMessage newItemHandler={() => setCreatedMessage(false)} />
      ) : (
        <div>
          <h2 className="text-gray-800 text-3xl text-center my-16">New Item</h2>
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
            <ChooseTopic register={register} error={errors.title?.message} />
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
