import { Elysia } from "elysia";

export default new Elysia().get("/", () => ({ message: "Hello Elysia" }), {
  detail: {
    tags: ["Homepage"],
    summary: "Hello world",
    description: "A simple hello world response.",
    responses: {
      "200": {
        description: "OK",
        headers: {
          "Access-Control-Allow-Credentials": {
            schema: {
              type: "boolean",
              example: true,
            },
          },
          "Access-Control-Allow-Headers": {
            schema: {
              type: "string",
              example: "*",
            },
          },
          "Access-Control-Allow-Methods": {
            schema: {
              type: "string",
              example: "*",
            },
          },
          "Access-Control-Allow-Origin": {
            schema: {
              type: "string",
              example: "*",
            },
          },
          "Access-Control-Expose-Headers": {
            schema: {
              type: "string",
              example: "*",
            },
          },
          "Access-Control-Exposed-Headers": {
            schema: {
              type: "string",
              example: "*",
            },
          },
          "Content-Length": {
            schema: {
              type: "number",
              example: 26,
            },
          },
          "Content-Type": {
            schema: {
              type: "string",
              example: "application/json;charset=utf-8",
            },
          },
          Date: {
            schema: {
              type: "string",
              example: "Mon, 08 Jul 2024 07:23:35 GMT",
            },
          },
          Vary: {
            schema: {
              type: "string",
              example: "*",
            },
          },
        },
        content: {
          "application/json": {
            schema: {
              type: "object",
              example: {
                message: "Hello Elysia",
              },
            },
          },
        },
      },
    },
  },
});
