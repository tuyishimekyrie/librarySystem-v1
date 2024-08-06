import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";
import { book } from "./Book";

export const borrowedbook = pgTable("borrowedbook", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  borrowedDate: timestamp("borrowedDate").notNull().defaultNow(),
  dueDate: timestamp("dueDate").notNull(),
  bookId: uuid("bookId")
    .notNull()
    .references(() => book.id),
});
