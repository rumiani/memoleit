import { DevTool } from "@hookform/devtools";
import React, { useState } from "react";
import TitleInput from "./titleInput/titleInput";
import Preview from "./preview/preview";
import { useForm } from "react-hook-form";
import ChooseTopic from "./chooseTopic/chooseTopic";
import CreatedMessage from "./CreatedMessage/CreatedMessage";
import { FormValues } from "@/src/types/interface";
import { saveNewItemToLocal } from "./handlers/saveNewItemHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import BodyInput from "./bodyInput/bodyInput";
import { formDataReducer } from "@/src/redux/slices/itemStateSlice";

export default function NewItemForm() {
  const { title, body, category } = useAppSelector(
    (state) => state.itemState.formData
  );
  const [createdMessage, setCreatedMessage] = useState(false);
  const form = useForm<FormValues>({
    defaultValues: { title, body, category },
    mode: "onBlur",
  });
  const dispatch = useAppDispatch()
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
    dispatch(formDataReducer({body:'',title:'',category:''}))
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
            <BodyInput error={errors.body?.message} register={register} />
            <ChooseTopic register={register} error={errors.category?.message} />
            <button className="primaryBtn mx-auto">Save</button>
            {/* <DevTool control={control} placement="top-right" /> */}
          </form>
          <Preview/>
        </div>
      )}
    </>
  );
}
