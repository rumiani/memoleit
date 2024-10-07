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
import AITopic from "./AITopic/AITopic";
import TestTypeInput from "./testTypeInput/testTypeInput";
import WritingInfo from "./writingInfo/writingInfo";
import { toast } from "react-toastify";

export default function EssayForm() {
  const { topic, task, body, type } = useAppSelector(
    (state) => state.essayState.essay,
  );
  const form = useForm<EssayValues>({
    defaultValues: { topic, body, task, type },
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

    try {
      const response = await fetch("/api/essay/evaluate", {
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
      dispatch(essayResultReducer(result.answer));
      toast.success("Your essay has been analysed successfully");
    } catch (error) {
      toast.error(
        "Something went wrong, please try again or check your network",
      );
    }
  };

  if (isSubmitSuccessful) {
    reset();
  }
  useEffect(() => {
    // reset({ topic,task, body, type  });
  }, [reset]);
  return (
    <div className="relative max-w-2xl w-full mx-auto gap-2 py-1">
      <div className="flex flex-row gap-2 justify-center items-center">
        <WritingInfo />
        <h2 className="text-center font-bold my-4">
          Write a General Training essay and analyze it with AI
        </h2>
      </div>
      <form
        className="flex flex-col justify-center"
        noValidate
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-2 items-center p-2 md:p-4 my-2 rounded-xl">
          <div className="flex flex-row w-full justify-around">
            <SelectTask register={register} error={errors.task?.message} />
            <TestTypeInput register={register} error={errors.type?.message} />
            <AITopic setValue={setValue} />
          </div>
          <TopicInput register={register} error={errors.topic?.message} />
          <BodyInput register={register} error={errors.body?.message} />
        </div>
        <button
          title="Analise my writing with AI"
          className="primaryBtn !w-fit mx-auto my-2"
        >
          Analise my writing with AI
        </button>
        {/* <DevTool control={control} placement="top-right" /> */}
      </form>
    </div>
  );
}
