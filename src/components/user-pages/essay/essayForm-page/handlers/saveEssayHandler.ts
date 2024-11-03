import { db } from "@/src/services/db";
import { EssayObjectTypes } from "@/src/types/interface";

export const saveEssayToLocal = async (essayObject: EssayObjectTypes) => {
  console.log(essayObject);

  try {
    const res = await db.essays.add(essayObject);
    return res;
  } catch (error: any) {
    console.log(error.message);
  }
};
