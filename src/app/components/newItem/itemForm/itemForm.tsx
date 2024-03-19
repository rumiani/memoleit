import React, { useEffect } from "react";
import TitleInput from "../../form_components/titleInput/titleInput";
import TagsInput from "../../form_components/tagsInput/tagsInput";
import Preview from "../../form_components/preview/preview";
import { useForm } from "react-hook-form";
import QuillEditor from "../../form_components/textInput/TextInput";
import { useDispatch, useSelector } from "react-redux";
import SubmitBtn from "../../form_components/submitBtn/submitBtn";
import { resetStateReducer } from "@/src/redux/appStateSlice";

type FormValues = {
  title: string;
  html: string;
  text: string;
  tags: {
    array: string[];
    tag: string;
  };
};
const ItemForm = () => {
  const { item } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const form = useForm<FormValues>({
    defaultValues: {
      title: "",
      html: "",
      text: "",
      tags: {
        array: [],
        tag: "",
      },
    },
    mode: "onBlur",
  });
  const {
    register,
    handleSubmit,
    formState,
    watch,
    getValues,
    setValue,
    reset,
  } = form;
  const { errors, isSubmitting, isSubmitSuccessful } = formState;

  const submitHandler = (data: FormValues) => {
    const item = { title: data.title, body: data.html, tags: data.tags?.array };
    if (item.title) {
      dispatch(createItem(item));
    }
  };

  useEffect(() => {
    dispatch(resetStateReducer());

    const subscription = watch((value) => {
      //   console.log("form values", value);
    });
    return () => subscription.unsubscribe;
  }, [dispatch, watch, reset, isSubmitSuccessful, setValue, getValues]);

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

        <QuillEditor
          error={errors.html?.message}
          watch={watch}
          register={register}
          setValue={setValue}
          getValues={getValues}
        />

        <TagsInput
          register={register}
          error={errors.tags?.tag?.message}
          watch={watch}
          setValue={setValue}
          getValues={getValues}
        />
        <SubmitBtn
          isSubmitting={isSubmitting}
          submitHandler={submitHandler}
          submitType={"publish"}
        />
      </form>
      <Preview getValues={getValues} />
    </div>
  );
};

export default ItemForm;
