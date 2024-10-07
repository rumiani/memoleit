import { EssayValues } from "@/src/types/interface";

export const essayPrompt = ({ topic, body, task }: EssayValues) =>
  `Analise this essay for IELTS writng task ${task}: \n Topic: ${topic} \n Essay: ${body}`;
