import {
  pgTable,
  uuid,
  varchar,
  timestamp,
  uniqueIndex,
  text,
} from "drizzle-orm/pg-core";
import { users} from "./user"; // Correct import if your user table is defined elsewhere

export const sessions = pgTable("session", {
  sessionToken: text("sessionToken").primaryKey(),
  userId: text("userId")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expires: timestamp("expires", { mode: "date" }).notNull(),
});