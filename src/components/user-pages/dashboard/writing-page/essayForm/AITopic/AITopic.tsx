import { useAppDispatch, useAppSelector } from "@/src/app/hooks";
import Spinner from "@/src/components/general/loading-comps/spinner/spinner";
import {
  essayFormDataReducer,
  essayResultReducer,
} from "@/src/redux/slices/essayStateSlice";
import { EssayValues } from "@/src/types/interface";
import React, { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { toast } from "react-toastify";

export default function AITopic({
  setValue,
}: {
  setValue: UseFormSetValue<EssayValues>;
}) {
  const { essay } = useAppSelector((state) => state.essayState);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const AITopicGenerator = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/essay/topic", {
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
      setValue("topic", result.answer);
      dispatch(essayFormDataReducer({ topic: result.answer }));
      toast.success("A new topic has been generated");
    } catch (error) {
      toast.error("Something went wrong, please check your network");
    } finally {
      setLoading(false);
    }
  };
  return (
    <button
      title="Generate a topic with AI"
      type="button"
      onClick={AITopicGenerator}
      disabled={loading}
      className="secondaryBtn w-32 h-10 flex flex-row gap-2"
    >
      <span>AI topic</span>
      {loading && <Spinner size={18} />}
    </button>
  );
}
