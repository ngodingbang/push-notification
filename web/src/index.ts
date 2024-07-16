import env from "@/src/utils/env";
import { generateTls } from "@/src/utils/experimental-https";
import parseArgs from "@/src/utils/parse-args";
import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";

const {
  values: { "experimental-https": experimentalHttps },
} = parseArgs;

const app = new Elysia()
  .use(staticPlugin({ assets: "web/public", prefix: "/" }))
  .compile();
const server = Bun.serve({
  port: env.WEB_PORT || 3001,
  fetch: (request) => app.handle(request),
  tls: experimentalHttps ? await generateTls() : undefined,
});

console.log(
  `🦊 Elysia is running at http${experimentalHttps ? "s" : ""}://${
    server?.hostname
  }:${server?.port}`
);
