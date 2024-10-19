import { EssayValues } from "@/src/types/interface";
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
type EssayEvaluation = {
  taskAchievement: string;
  coherenceAndCohesion: string;
  lexicalResource: string;
  grammaticalRangeAndAccuracy: string;
  score: number;
  isRelatedToTopic: boolean;
};

const schema = {
  type: "object",
  properties: {
    "Task Achievement": { type: "string", title: "Task Achievement" },
    "Coherence and Cohesion": {
      type: "string",
      title: "Coherence and Cohesion",
    },
    "Lexical Resource": { type: "string", title: "Lexical Resource" },
    "Grammatical Range and Accuracy": {
      type: "string",
      title: "Grammatical Range and Accuracy",
    },
    score: {
      type: "number",
      title: "Score",
      divisibleBy: 0.5,
      minimum: 1,
      maximum: 9,
    },
    isRelatedToTopic: { type: "boolean", title: "Is related to Topic" },
  },
  required: [
    "Task Achievement",
    "Coherence and Cohesion",
    "Lexical Resource",
    "Grammatical Range and Accuracy",
    "score",
    "isRelatedToTopic",
  ],
};

const groqEssayEvaluator = async (
  essay: EssayValues,
): Promise<EssayEvaluation> => {
  const jsonSchema = JSON.stringify(schema, null, 4);
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `You are an IELTS essay evaluation system that scores the essay based on the IELTS essay requirements. 
            Evaluate the following essay for IELTS ${essay.type} writng task ${essay.task} 
            The evaluation must follow this JSON schema: ${jsonSchema}.
            Please make sure the response is a valid JSON object and also the essay is about the topic otherwise put the isRelatedToTopic value to false.`,
      },
      {
        role: "user",
        content: `The topic is ${essay.topic}. Fetch an evaluation for this essay: ${essay.body}`,
      },
    ],
    model: "llama3-8b-8192",
    temperature: 0,
    stream: false,
    response_format: { type: "json_object" },
  });

  const parsed = JSON.parse(chatCompletion.choices[0].message.content!);

  return {
    taskAchievement: parsed["Task Achievement"],
    coherenceAndCohesion: parsed["Coherence and Cohesion"],
    lexicalResource: parsed["Lexical Resource"],
    grammaticalRangeAndAccuracy: parsed["Grammatical Range and Accuracy"],
    score: parsed.score,
    isRelatedToTopic: parsed.isRelatedToTopic,
  };
};
export default groqEssayEvaluator;
