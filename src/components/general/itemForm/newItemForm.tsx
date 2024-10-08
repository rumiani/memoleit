import { DevTool } from "@hookform/devtools";
import { useEffect, useState } from "react";
import TitleInput from "./titleInput/titleInput";
import Preview from "./preview/preview";
import { useForm } from "react-hook-form";
import CreatedMessage from "./CreatedMessage/CreatedMessage";
import { FormValues } from "@/src/types/interface";
import { saveNewItemToLocal } from "./handlers/saveNewItemHandler";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import BodyInput from "./bodyInput/bodyInput";
import {
  formDataReducer,
  removeTranslationItemReducer,
} from "@/src/redux/slices/itemStateSlice";
import { saveEditedItemHandler } from "./handlers/saveEditedItemHandler";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import ChooseCategory from "./chooseCategory/chooseCategory";
import appPages from "@/src/data/appPages/appPages";
import WordLists from "./wordsList/wordLists/wordLists";

export default function NewItemForm() {
  const path = usePathname();
  const itemID = path.split("/").pop();
  const { title, body, category } = useAppSelector(
    (state) => state.itemState.formData,
  );
  const [createdMessage, setCreatedMessage] = useState(false);
  const { translatingItems } = useAppSelector((state) => state.itemState);

  const form = useForm<FormValues>({
    defaultValues: appPages.isEditPage(path)
      ? { title, body, category }
      : { title: "", body: "", category: "" },
    mode: "onBlur",
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
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

  const submitHandler = async (item: FormValues) => {
    dispatch(removeTranslationItemReducer(item.title));
    try {
      if (appPages.isEditPage(path)) {
        await saveEditedItemHandler(item, itemID!);
        router.push("/user/box/item/" + itemID!);
      } else {
        saveNewItemToLocal(item);
      }
      dispatch(formDataReducer({ body: "", title: "", category: "" }));
    } catch (error) {}
  };

  if (isSubmitSuccessful) {
    setCreatedMessage(true);
    reset();
  }
  useEffect(() => {
    reset({ title, body, category });
  }, [title, body, category, reset]);
  return (
    <>
      {createdMessage ? (
        <CreatedMessage setCreatedMessage={() => setCreatedMessage(false)} />
      ) : (
        <div
          className={`${
            appPages.isEditPage(path) ? "bg-yellow-100" : "bg-green-100"
          } relative max-w-2xl w-full mx-auto gap-2 py-1`}
        >
          <WordLists />

          <form
            className="flex flex-col justify-center"
            noValidate
            onSubmit={handleSubmit(submitHandler)}
          >
            <div className="flex flex-col gap-2 items-center p-2 md:p-4 my-2 rounded-xl">
              <TitleInput register={register} error={errors.title?.message} />
              <BodyInput register={register} error={errors.body?.message} />
              <ChooseCategory
                register={register}
                error={errors.category?.message}
              />
            </div>
            <button className="primaryBtn mx-auto my-2">
              {appPages.isEditPage(path) ? "Update" : "Save"}
            </button>
            {/* <DevTool control={control} placement="top-right" /> */}
          </form>
          <Preview />
        </div>
      )}
    </>
  );
}
