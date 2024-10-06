import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { EssayValues } from "@/src/types/interface";
import { useRouter } from "next/navigation";
import SelectTask from "./taskInput/taskInput";
import TopicInput from "./topicInput/topicInput";
import BodyInput from "./bodyInput/bodyInput";
import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import { essayResultReducer } from "@/src/redux/slices/essayStateSlice";

export default function EssayForm() {
  const { topic, task, body } = useAppSelector(
    (state) => state.essayState.essay,
  );
  const form = useForm<EssayValues>({
    defaultValues: { topic, body, task },
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

  const submitHandler = async (essay: EssayValues, e: any) => {
    e.preventDefault();
    console.log('req');
    
    try {
      const response = await fetch("/api/essay", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ essay }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log(result);
      
      dispatch(essayResultReducer(result));
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  if (isSubmitSuccessful) {
    reset();
  }
  useEffect(() => {
    reset({ topic, body, task });
  }, [reset]);
  return (
    <div className="relative max-w-2xl w-full mx-auto gap-2 py-1">
      <form
        className="flex flex-col justify-center"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-2 items-center p-2 md:p-4 my-2 rounded-xl">
          <TopicInput register={register} error={errors.topic?.message} />
          <SelectTask register={register} error={errors.task?.message} />
          <BodyInput register={register} error={errors.body?.message} />
        </div>
        <button className="primaryBtn !w-fit mx-auto my-2">
          Analise my writing with AI
        </button>
        {/* <DevTool control={control} placement="top-right" /> */}
      </form>
    </div>
  );
}
