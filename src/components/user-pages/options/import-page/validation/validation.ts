import { z } from "zod";
const categorySchema = z.object({
  id: z.string(),
  userId: z.string(),
  name: z.string(),
  status: z.boolean(),
  createdAt: z.number(),
});
const itemSchema = z.object({
  id: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  title: z.string(),
  body: z.string(),
  category: z.string(),
  box: z.number(),
  createdAt: z.number(),
  lastReview: z.number(),
});

export const dataSchema = z.object({
  items: z.array(itemSchema),
  categories: z.array(categorySchema),
});
