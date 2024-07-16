import { Elysia } from "elysia";
import { model } from "../../models";

export default new Elysia().get(
  "/",
  async () => ({
    data: await model.subscription.findMany(),
  }),
  {
    detail: {
      tags: ["Subscription"],
      summary: "index",
      description: "Get list of subscriptions data.",
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
                example: 735,
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
                example: "Mon, 08 Jul 2024 07:28:23 GMT",
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
                  data: [
                    {
                      id: "66f56843-fc0f-4115-b68e-bbffcb119cfd",
                      data: '{"vapidKeys":{"publicKey":"BAeIZHY1TCnOOAaGqZzzfJTeBiyGA_YZIcWaODV05ptlv09i_15PRJWG6lqgMF4ayQFu0yfRb7aciHIobGqJlDE","privateKey":"U8v7pc-muOVWWfq6IaYRBQF6eiz0bZqLLS0GWV6t2Zk"},"pushSubscription":{"endpoint":"https://fcm.googleapis.com/fcm/send/dmPpsX9xHLU:APA91bGrkAksSInfL5KyUUwFSPUG6zokmm1nHon7nyVambuTfutfC1ukjTMsnFLP1Cn_Ph5VFetEelIOo1M8qKE1jhL5n__LmeSWohcHhmEUsm3qGQU25FTk9qCkLoPS4kpQmEPK17bs","expirationTime":null,"keys":{"p256dh":"BEOBqPrwEgVzfewtBU1Tc67q557V7mWEIci02-WlVRr-BZ4L2VQnnr8ysp1PKxgMtIWmQGPSHVCsrnX63918DXk","auth":"I40bnVq7QwXKdioNk1ha9g"}}}',
                      created_at: "2024-07-08T06:48:47.569Z",
                      updated_at: "2024-07-08T06:48:47.569Z",
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  }
);
