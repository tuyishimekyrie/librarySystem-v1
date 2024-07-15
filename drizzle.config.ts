import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: process.env.DATABASE_URL as string,
  },
  // dbCredentials: {
  //   host: process.env.DB_HOST as string,
  //   port: Number(process.env.DB_PORT), // Parse port as number
  //   user: process.env.DB_USER as string,
  //   password: process.env.DB_PASSWORD as string,
  //   database: process.env.DB_NAME as string,
  // },
  verbose: true,
  strict: true,
});
