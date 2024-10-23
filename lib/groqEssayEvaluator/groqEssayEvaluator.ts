import { EssayEvaluation, EssayValues } from "@/src/types/interface";
import Groq from "groq-sdk";
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const schema = {
  type: "object",
  properties: {
    taskAchievement: { type: "string", title: "Task Achievement" },
    coherenceAndCohesion: {
      type: "string",
      title: "Coherence and Cohesion",
    },
    lexicalResource: { type: "string", title: "Lexical Resource" },
    grammaticalRangeAndAccuracy: {
      type: "string",
      title: "Grammatical Range and Accuracy",
    },
    suggestions: {
      type: "string",
      title: "Suggestions to write a better essay in the future",
    },
    score: {
      type: "number",
      title: "Score",
      divisibleBy: 0.5,
      minimum: 1,
      maximum: 9,
    },
    isRelatedToTopic: { type: "boolean", title: "True if the essay is related to Topic and false if it is not" },
  },
  required: [
    "taskAchievement",
    "coherenceAndCohesion",
    "lexicalResource",
    "grammaticalRangeAndAccuracy",
    "suggestions",
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
            Evaluate the following essay for IELTS ${essay.type} writng task ${essay.task}.
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
    taskAchievement: {title:"Task Achievement", value:parsed["taskAchievement"]},
    coherenceAndCohesion: parsed["coherenceAndCohesion"],
    lexicalResource: parsed["lexicalResource"],
    grammaticalRangeAndAccuracy: parsed["grammaticalRangeAndAccuracy"],
    suggestions: parsed["suggestions"],
    score: parsed.score,
    isRelatedToTopic: parsed.isRelatedToTopic,
  };
};
export default groqEssayEvaluator;
