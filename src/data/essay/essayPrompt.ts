type taskType = {
  one: string;
  two: string;
};
type criteriaType = {
  academic: taskType;
  general: taskType;
};
export const essayPrompt = ({
  topic,
  type,
  body,
  task,
}: {
  topic: string;
  type: keyof criteriaType;
  body: string;
  task: keyof taskType;
}) => {
  const ieltsWritingCriteria: criteriaType = {
    academic: {
      one: `Task Achievement: Check if the essay; Accurately describes the visual information in detail.
        Coherence and Cohesion: Check if the essay; Logical organization and progression of information.
        Lexical Resource: Check if the essay; Use of varied and precise vocabulary and terminology related to data description.
        Grammatical Range and Accuracy: Check if the essay; Wide range of grammatical structures with minimal errors.`,
      two: `Task Achievement: Check if the essay; Fully addresses the question and provides relevant examples.
        Coherence and Cohesion: Check if the essay; Logical flow and structure with effective paragraphing.
        Lexical Resource: Check if the essay; Uses a wide variety of vocabulary accurately and appropriately.
        Grammatical Range and Accuracy: Check if the essay; Uses a wide range of grammatical structures with accuracy.`,
    },
    general: {
      one: `Task Achievement: Check if the essay; Addresses all parts of the letter (purpose, request, etc.) appropriately.
        Coherence and Cohesion: Check if the essay; Well-organized with a clear progression of ideas.
        Lexical Resource: Check if the essay; Uses vocabulary suitable for the letter's tone (formal/informal).
        Grammatical Range and Accuracy: Check if the essay; Uses a variety of sentence structures with few errors.`,
      two: `Task Achievement: Check if the essay; Fully addresses the essay question with relevant points and examples.
        Coherence and Cohesion: Check if the essay; Logical and cohesive argument with clear paragraphing.
        Lexical Resource: Check if the essay; Uses a range of vocabulary accurately and effectively.
        Grammatical Range and Accuracy: Check if the essay; Wide range of grammatical structures with minimal errors.`,
    },
  };

  const criteria = ieltsWritingCriteria[type][task];
  return `
  Evaluate the following essay for IELTS ${type} writng task ${task} 
  Criteries to check if the essay is based on:
  ${criteria}
  `;
};
