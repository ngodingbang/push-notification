import env from "@/src/utils/env";
import { generateTls } from "@/src/utils/experimental-https";
import parseArgs from "@/src/utils/parse-args";
import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import swagger from "./lib/swagger";
import routes from "./routes";

const {
  values: { "experimental-https": experimentalHttps },
} = parseArgs;

export const app = new Elysia().use(cors()).use(swagger).use(routes).compile();

const server = Bun.serve({
  port: env.API_PORT,
  fetch: (request) => app.handle(request),
  tls: experimentalHttps ? await generateTls() : undefined,
});

console.log(
  `🦊 Elysia is running at http${experimentalHttps ? "s" : ""}://${
    server?.hostname
  }:${server?.port}`
);
