import { staticPlugin } from "@elysiajs/static";
import { Elysia } from "elysia";
import { parseArgs } from "util";
import { generateTls } from "./experimental-https";

const {
  values: { "experimental-https": experimentalHttps },
} = parseArgs({
  args: Bun.argv,
  options: {
    "experimental-https": {
      type: "boolean",
      default: false,
    },
  },
  strict: true,
  allowPositionals: true,
});

const app = new Elysia().use(staticPlugin({ prefix: "/" }));
const server = Bun.serve({
  port: process.env.PORT || 3001,
  fetch: (request) => app.handle(request),
  tls: experimentalHttps ? await generateTls() : undefined,
});

console.log(
  `🦊 Elysia is running at http${experimentalHttps ? "s" : ""}://${
    server?.hostname
  }:${server?.port}`
);
