import { z } from "zod";

export const borrowedDateSchema = z.object({
  userId: z.string().uuid(),
  bookId: z.string(),
  dueDate: z.string().transform((val) => {
    const parsedDate = new Date(val);
    if (isNaN(parsedDate.getTime())) {
      throw new Error("Invalid date format");
    }
    return parsedDate;
  }),
});
