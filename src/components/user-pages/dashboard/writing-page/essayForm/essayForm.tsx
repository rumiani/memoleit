import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { EssayValues } from "@/src/types/interface";
import { useRouter } from "next/navigation";
import TopicInput from "./topicInput/topicInput";
import BodyInput from "./bodyInput/bodyInput";
import { useAppDispatch } from "@/src/app/hooks";
import {
  essayFormDataReducer,
  essayResultReducer,
} from "@/src/redux/slices/essayStateSlice";
import AITopic from "./AITopic/AITopic";
import WritingInfo from "./writingInfo/writingInfo";
import { toast } from "react-toastify";
import TaskInput from "./taskInput/taskInput";
import TypeInput from "./typeInput/typeInput";
import Spinner from "@/src/components/general/loading-comps/spinner/spinner";

export default function EssayForm() {
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<EssayValues>({
    defaultValues: { topic: "", body: "", task: "one", type: "general" },
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
    setLoading(true);
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
      dispatch(essayResultReducer(result.essay.evaluation));
      dispatch(essayFormDataReducer({ ...essay }));

      toast.success("Your essay has been analysed successfully");
    } catch (error) {
      toast.error(
        "Something went wrong, please try again or check your network",
      );
    } finally {
      setLoading(false);
    }
  };

  if (isSubmitSuccessful) {
    reset();
  }
  useEffect(() => {
    // reset({ topic,task, body, type  });
  }, [reset]);
  return (
    <div className="relative max-w-2xl w-full mx-auto gap-2 py-1 mb-16">
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
            <TaskInput register={register} watch={watch} />
            <TypeInput register={register} watch={watch} />

            <AITopic setValue={setValue} watch={watch} getValues={getValues} />
          </div>
          <TopicInput register={register} error={errors.topic?.message} />
          <BodyInput
            register={register}
            watch={watch}
            error={errors.body?.message}
          />
        </div>
        <button
          disabled={loading}
          title="Analise my writing with AI"
          className="primaryBtn !w-fit mx-auto my-2 flex flex-row gap-2"
        >
          <span>Analise my writing with AI</span>
          {loading && <Spinner size={18} />}
        </button>
      </form>
    </div>
  );
}
