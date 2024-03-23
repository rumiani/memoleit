import { DevTool } from '@hookform/devtools';
import React from "react";
import TitleInput from "./titleInput/titleInput";
import Preview from "./preview/preview";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import RichTextEditor from "./richTexhEditor/RichTextEditor";
import ChooseTopic from "./chooseTopic/chooseTopic";
import { saveNewItemToLocal } from '@/src/handlers/saveHandler';

type FormValues = {
  title: string;
  body: string;
  topic: string;
};
const NewItemForm = () => {
  const { item } = useSelector((state) => state.appState);
  const dispatch = useDispatch();

  const form = useForm<FormValues>({
    defaultValues: { title: "", body: "", topic: "" },
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
    saveNewItemToLocal(item)

  };

  // useEffect(() => {
  //   dispatch(resetStateReducer());

  //   const subscription = watch((value) => {
  //       console.log("form values", value);
  //   });
  //   return () => subscription.unsubscribe;
  // }, [dispatch, watch, reset, isSubmitSuccessful, setValue, getValues]);

  if (isSubmitSuccessful) {
    // console.log("Submit Successful");
    // reset()
    // return  <SentComponent item={item} newItemHandler={newItemHandler}/>
  }
  return (
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
        <ChooseTopic register={register} error={errors.title?.message} />
        <button className="primaryBtn mx-auto">publish</button>
      {/* <DevTool control={control} placement="top-right" /> */}
      </form>
      <Preview getValues={getValues} />
    </div>
  );
};

export default NewItemForm;