import { pgTable, serial, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user";
import { book } from "./Book";

export const borrowedbook = pgTable("borrowedbook", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  borrowedDate: timestamp("borrowedDate").notNull().defaultNow(),
  dueDate: timestamp("dueDate").notNull(),
  bookId: serial("bookId")
    .notNull()
    .references(() => book.id),
});
