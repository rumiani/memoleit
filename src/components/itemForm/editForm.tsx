import { DevTool } from "@hookform/devtools";
import React, { useEffect, useState } from "react";
import TitleInput from "./titleInput/titleInput";
import Preview from "./preview/preview";
import { useForm } from "react-hook-form";
import RichTextEditor from "./richTexhEditor/RichTextEditor";
import ChooseTopic from "./chooseTopic/chooseTopic";
import CreatedMessage from "./CreatedMessage/CreatedMessage";
import { FormValues } from "@/src/types/interface";
import { saveEditedItemHandler } from "@/src/handlers/saveEditedItemHandler";

const EditForm = ({
  itemDefaultValues,id
}: {
  itemDefaultValues: FormValues | undefined, id:string
}) => {
  const [createdMessage, setCreatedMessage] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: itemDefaultValues,
    mode: "onBlur",
  });
  console.log(itemDefaultValues);

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
  useEffect(() => {
    if (itemDefaultValues) {
      setValue("title", itemDefaultValues!.title);
      setValue("body", itemDefaultValues!.body);
      setValue("category", itemDefaultValues!.category);
    }
  }, [formState, setValue, itemDefaultValues]);

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const submitHandler = (item: FormValues) => {
    saveEditedItemHandler(item,id);
  };

  if (isSubmitSuccessful) {
    setCreatedMessage(true);
    reset();
  }
  return (
    <>
      {createdMessage ? (
        <CreatedMessage createdMsgHandler={() => setCreatedMessage(false)} />
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
            <button className="primaryBtn mx-auto">Save Edit</button>
            {/* <DevTool control={control} placement="top-right" /> */}
          </form>
          <Preview getValues={getValues} />
        </div>
      )}
    </>
  );
};

export default EditForm;
