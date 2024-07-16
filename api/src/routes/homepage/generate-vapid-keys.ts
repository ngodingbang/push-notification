import { Elysia } from "elysia";
import webpush from "web-push";

export default new Elysia().get(
  "/generate-vapid-keys",
  () => ({ data: webpush.generateVAPIDKeys() }),
  {
    detail: {
      tags: ["Homepage"],
      summary: "Generate VAPID Keys",
      description:
        "Generate VAPID Keys using for creating a push subscriptions on the service worker.",
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
                example: 171,
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
                example: "Mon, 08 Jul 2024 07:26:45 GMT",
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
                  data: {
                    publicKey:
                      "BAFntZMGF7-Mb2l5zdn66ZWZ9cN2RYxJ7GcarldTWhz73ZLisMU3svK1aTQPY2n7XoeywmJPwsKGmzVro5NTHMo",
                    privateKey: "g1cqh8s3mhLui5kGe3dHpNbBQVYPkOtQNbYSIHwZzuA",
                  },
                },
              },
            },
          },
        },
      },
    },
  }
);
