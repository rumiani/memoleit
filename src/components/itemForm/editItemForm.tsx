import { DevTool } from "@hookform/devtools";
import React, { useEffect, useState } from "react";
import TitleInput from "./titleInput/titleInput";
import Preview from "./preview/preview";
import { useForm } from "react-hook-form";
import RichTextEditor from "./richTexhEditor/RichTextEditor";
import ChooseTopic from "./chooseTopic/chooseTopic";
import CreatedMessage from "./CreatedMessage/CreatedMessage";
import { FormValues } from "@/src/types/interface";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { categoriesReducer } from "@/src/redux/slices/categoryStateSlice";
import { saveEditedItemHandler } from "./handlers/saveEditedItemHandler";
import { db } from "@/src/services/db";

export default function EditItemForm({ id }: { id: string }) {
  const { formData } = useAppSelector((state) => state.itemState);
  const [createdMessage, setCreatedMessage] = useState(false);

  const dispatch = useAppDispatch();

  const form = useForm<FormValues>({
    defaultValues: formData,
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
  useEffect(() => {
    if (formData) {
      setValue("title", formData!.title);
      setValue("body", formData!.body);
      setValue("category", formData!.category);
    }
  }, [formState, setValue, formData, getValues]);

  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const submitHandler = (item: FormValues) => {
    saveEditedItemHandler(item, id);
  };
  if (isSubmitSuccessful) {
    setCreatedMessage(true);
    reset();
    try {
      db.categories.toArray().then((existedCategories) => {
        dispatch(categoriesReducer(existedCategories));
      });
    } catch (error) {
      console.log("Error");
    }
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
              defaultValue={formData?.body}
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
}
