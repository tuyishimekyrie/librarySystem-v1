import { pgTable, text, uniqueIndex } from "drizzle-orm/pg-core";
import { users } from "./user";

export const roles = pgTable(
  "role",
  {
    id: text("id")
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    name: text("name").notNull(),
  },
  (roles) => ({
    uniqueName: uniqueIndex("unique_name").on(roles.name),
  })
);

export const userRoles = pgTable("user_role", {
  userId: text("userId").references(() => users.id),
  roleId: text("roleId").references(() => roles.id),
});
