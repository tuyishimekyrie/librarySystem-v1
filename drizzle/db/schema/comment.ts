import { pgTable, text, uuid, varchar } from "drizzle-orm/pg-core";

export const comment = pgTable("comment", {
  id: uuid("id").primaryKey().defaultRandom(),
  comment: text("comment").notNull(),
});
