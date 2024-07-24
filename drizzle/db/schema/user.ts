import { pgTable, uuid, varchar } from "drizzle-orm/pg-core";

// user table
export const userTable = pgTable("user", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
});
