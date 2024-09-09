import { z } from "zod";
const wordObjectSchema = z
  .record(z.string(), z.string())
  .refine((obj) => Object.keys(obj).length === 2, {
    message: "Each object must have exactly 2 key-value pairs.",
  });

export const csvDataSchema = z.array(wordObjectSchema);
