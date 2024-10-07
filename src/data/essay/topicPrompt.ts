type TaskType = {
  general: string;
  academic: string;
};

type OptionsType = {
  [key: string]: TaskType;
};
export default function topicPrompt(
  task: keyof OptionsType,
  type: keyof TaskType,
) {
  const options: OptionsType = {
    "1": {
      general:
        "write in a personal, semi-formal or formal style that needs to be at least 150 words",
      academic:
        "write in a personal, semi-formal or formal style that needs to be at least 150 words",
    },
    "2": {
      general:
        "give reasons for your answer and include examples from your own knowledge or experience that needs to be at least 250 words",
      academic:
        "give reasons for your answer and include examples from your own knowledge or experience that needs to be at least 250 words",
    },
  };

  return `Give me a topic for task ${task} of 
            ${type} IELTS exam with these requirements:
            ${options[task][type]}.
            remember to cut to the chase and only give me the topic with zero extra words or explanation or intruduction.
            `;
}
