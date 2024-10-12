import Spinner from "@/src/components/general/loading-comps/spinner/spinner";
import { EssayValues } from "@/src/types/interface";
import React, { useState } from "react";
import { UseFormSetValue, UseFormWatch } from "react-hook-form";
import { toast } from "react-toastify";

export default function AITopic({
  setValue,
  watch,
}: {
  setValue: UseFormSetValue<EssayValues>;
  watch: UseFormWatch<EssayValues>;
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
      setValue("topic", result.answer);
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
