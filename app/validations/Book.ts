import { z } from "zod";

export const createBookSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(5),
  author: z.string().min(5),
  isbn: z.string().min(3),
  description: z.string().min(5),
  categoryId: z.string().uuid(),
});
