import { z } from "zod";

export const commentSchema = z.object({
  id: z.string().optional(),
  comment: z.string().min(3),
});
