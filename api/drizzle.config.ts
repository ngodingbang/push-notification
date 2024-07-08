import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./database/schema.ts",
  out: "./database/migrations",
  dialect: "sqlite",
  dbCredentials: {
    url: process.env.DB_URL || "./database/database.sqlite",
  },
});
