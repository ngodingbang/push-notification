import { z } from "zod";

export default z
  .object({
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    API_PORT: z.string().default("3000"),
    WEB_PORT: z.string().default("3001"),
    API_DB_URL: z.string().default("file:./database.db"),
  })
  .parse(process.env);
