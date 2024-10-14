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
      one: `Task Achievement: Accurately describes the visual information.
        Coherence and Cohesion: Logical organization of information.
        Lexical Resource: Use of appropriate vocabulary and terminology.
        Grammatical Range and Accuracy: Variety and correctness in grammar.`,
      two: `Task Response: Addresses the question fully.
        Coherence and Cohesion: Logical flow and structure of ideas.
        Lexical Resource: Use of varied and precise vocabulary.
        Grammatical Range and Accuracy: Range and accuracy in grammar.`,
    },
    general: {
      one: `Task Achievement: Addresses the requirements of the letter.
        Coherence and Cohesion: Logical flow and organization.
        Lexical Resource: Appropriate vocabulary for informal/formal contexts.
        Grammatical Range and Accuracy: Correct grammar usage.`,
      two: `Task Response: Fully responds to the prompt.
        Coherence and Cohesion: Well-structured arguments.
        Lexical Resource: Varied and precise vocabulary.
        Grammatical Range and Accuracy: Range and correctness in grammar.`,
    },
  };
  const criteria = ieltsWritingCriteria[type][task];
  return `
  Analyze the following essay for IELTS ${type} writng task ${task} 
  Criteries to consider:
  ${criteria}
  The topic: ${topic}
  The essay: ${body}
  Return the results strictly in the specified JSON format without 
  any intruduction or additional text or explanations and without any pre and post text. 
  The JSON should be like this and wrapped in {}:
  { "analysis":
    {
      "Task Achievement": "an explenation or consideration or some tips for the future essay.",
      "Coherence and Cohesion": "an explenation or consideration or some tips for the future essay.",
      "Lexical Resource": "an explenation or consideration or some tips for the future essay.",
      "Grammatical Range and Accuracy": "an explenation or consideration or some tips for the future essay.",
      }
    "score":"it should be a number that can be divisible 0.5"}
  `;
};
