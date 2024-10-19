import { EssayValues } from "@/src/types/interface";

export default function topicPrompt(essay: EssayValues) {
  const options = {
    general: {
      one: "write in a personal, semi-formal or formal style that needs to be at least 150 words",
      two: "give reasons for your answer and include examples from your own knowledge or experience that needs to be at least 250 words",
    },
    academic: {
      one: "write in a personal, semi-formal or formal style that needs to be at least 150 words",
      two: "give reasons for your answer and include examples from your own knowledge or experience that needs to be at least 250 words",
    },
  };

  return `Give me a topic for task ${essay.task} of ${essay.type} IELTS exam with these requirements: ${options[essay.type][essay.task]}. remember to cut to the chase and only give me the topic with zero extra words or explanation or intruduction.`;
}
