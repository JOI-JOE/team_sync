import { z } from "zod";

export const emojiSchema = z.string().trim().optional();
export const nameSchema = z.string().trim().min(1).max(225);
export const descriptionSchema = z.string().trim().optional();
export const projectIdSchema = z
  .string()
  .trim()
  .min(1, { message: "Project ID is required" });

export const createProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema,
});

export const updateProjectSchema = z.object({
  emoji: emojiSchema,
  name: nameSchema,
  description: descriptionSchema,
});
