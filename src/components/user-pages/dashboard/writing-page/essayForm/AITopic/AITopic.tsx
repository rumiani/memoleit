import Spinner from "@/src/components/general/loading-comps/spinner/spinner";
import { EssayValues } from "@/src/types/interface";
import React, { useState } from "react";
import {
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { toast } from "react-toastify";

export default function AITopic({
  setValue,
  watch,
  getValues,
}: {
  setValue: UseFormSetValue<EssayValues>;
  watch: UseFormWatch<EssayValues>;
  getValues: UseFormGetValues<EssayValues>;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const topic = watch("topic");
  const task = watch("task");
  const body = watch("body");
  const type = watch("type");

  const AITopicGenerator = async () => {
    setLoading(true);

    const essay = { topic, task, body, type };
    try {
      const response = await fetch("/api/essay/topic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ essay }),
      });

      if (!response.ok) throw new Error("Network response was not ok");

      const result = await response.json();
      setValue("topic", "");

      let index = 0;
      const intervalId = setInterval(() => {
        if (result.streamArray.length === 0) {
          toast.success("A new topic has been generated");
          clearInterval(intervalId);
          return;
        }
        const chunk = result.streamArray.shift();
        setValue("topic", getValues("topic") + chunk);
        index++;
      }, 100);
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
