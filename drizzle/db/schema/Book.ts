import { pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";
import { categorycateTable } from "./Category";

export const book = pgTable("book", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }),
  author: varchar("author", { length: 256 }),
  isbn: varchar("isbn", { length: 256 }),
  description: varchar("description", { length: 256 }),
    categoryId: uuid("categoryId")  
    .references(() => categorycateTable.id),  
});
