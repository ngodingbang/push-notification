import { cors } from "@elysiajs/cors";
import { swagger } from "@elysiajs/swagger";
import { Elysia, t } from "elysia";
import webpush from "web-push";
import { model } from "./models";
import { SubscriptionData } from "./types";

const app = new Elysia()
  .use(cors())
  .use(
    swagger({
      path: "/api-doc",
      documentation: {
        info: {
          title: "NgodingBang Push Notification API",
          version: "1.0.0",
          license: {
            name: "MIT",
            url: "https://github.com/ngodingbang/push-notification/blob/main/LICENSE.md",
          },
        },
        tags: [
          {
            name: "Homepage",
            description: "Homepage API.",
          },
          {
            name: "Subscription",
            description: "Subscription CRUD API.",
          },
        ],
      },
      exclude: ["/api-doc", "/api-doc/json"],
    })
  )
  .get("/", () => ({ message: "Hello Elysia" }), {
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
  })
  .get("/generate-vapid-keys", () => ({ data: webpush.generateVAPIDKeys() }), {
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
  })
  .group("/subscriptions", (app) =>
    app
      .get(
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
      )
      .post(
        "/send-notifications",
        async ({ body: { title, options }, set }) => {
          const subscriptions = await model.subscription.findMany();

          const responses = await Promise.allSettled(
            subscriptions.map((subscription) => {
              const data: SubscriptionData = JSON.parse(subscription.data);

              return webpush.sendNotification(
                data.pushSubscription,
                JSON.stringify({ title, options }),
                {
                  vapidDetails: {
                    subject: "mailto:ngodingbang@gmail.com",
                    publicKey: data.vapidKeys.publicKey,
                    privateKey: data.vapidKeys.privateKey,
                  },
                }
              );
            })
          );

          return {
            data: subscriptions.map((subscription, index) => ({
              subscription,
              response: responses[index],
            })),
          };
        },
        {
          body: t.Object({
            title: t.String(),
            options: t.Partial(
              t.Object({
                badge: t.String(),
                body: t.String(),
                data: t.Any(),
                dir: t.Union([
                  t.Literal("auto"),
                  t.Literal("ltr"),
                  t.Literal("rtl"),
                ]),
                icon: t.String(),
                lang: t.String(),
                requireInteraction: t.Boolean(),
                silent: t.Nullable(t.Boolean()),
                tag: t.String(),
              })
            ),
          }),
          detail: {
            tags: ["Subscription"],
            summary: "send notifications",
            description: "Sending notifications to all subscription list.",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      title: "Test Notification from API",
                      options: {
                        body: "This is the content of the notification.",
                      },
                    },
                  },
                },
              },
            },
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
                      example: 1546,
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
                      example: "Mon, 08 Jul 2024 10:48:20 GMT",
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
                            subscription: {
                              id: "1eab7dd3-c218-4ef9-8c7f-0ba9bab71d2b",
                              data: '{"vapidKeys":{"publicKey":"BEayAvCfBy37jwgu5xdn9YaNLwWp5WfuUVoGUiJ0gizdXL6aheLmySROkHEZnjWSdO1xM5LDgK-JNJpOxuBU1Jg","privateKey":"aFmawZJSmJS8EsurA_dIVTWhYVnPI8s7aCmE9IWWZcc"},"pushSubscription":{"endpoint":"https://fcm.googleapis.com/fcm/send/fdlf94b-XJg:APA91bGGhfI4jMVLqPcyhhPYhSbWJr4faPbUqquwNWitGgib5IHqXuwro_2-8EQE5eF6NOgatF4Bd9nvQ_yP6o0BpGJ-Q6LEFnoBZg0Rn41WYc7F7eLRWi6iS5ShJcN0tOmmGQzxmcIx","expirationTime":null,"keys":{"p256dh":"BH8y0sM5bb1awgkIXQ7KQDnZd3vf-J_fvZbUuIxDGbsXlSZA1jxixgxSMl6PUxe8EdDvtweeXBWSILs6G_3gmsM","auth":"QOHNbqdWEqgH0SJ4hxJsrQ"}}}',
                              created_at: "2024-07-08T07:53:50.555Z",
                              updated_at: "2024-07-08T07:53:50.555Z",
                            },
                            response: {
                              status: "fulfilled",
                              value: {
                                statusCode: 201,
                                body: "",
                                headers: {
                                  "content-security-policy-report-only":
                                    "script-src 'none'; form-action 'none'; frame-src 'none'; report-uri https://csp.withgoogle.com/csp/goa-520bfc14",
                                  "cross-origin-opener-policy-report-only":
                                    'same-origin; report-to="goa-520bfc14"',
                                  location:
                                    "https://fcm.googleapis.com/0:1720435700375438%ce96710ef9fd7ecd",
                                  "report-to":
                                    '{"group":"goa-520bfc14","max_age":2592000,"endpoints":[{"url":"https://csp.withgoogle.com/csp/report-to/goa-520bfc14"}]}',
                                  "x-content-type-options": "nosniff",
                                  "x-frame-options": "SAMEORIGIN",
                                  "x-xss-protection": "0",
                                  date: "Mon, 08 Jul 2024 10:48:20 GMT",
                                  "content-length": "0",
                                  "content-type": "text/html; charset=UTF-8",
                                  "alt-svc":
                                    'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
                                },
                              },
                            },
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
      )
      .post(
        "/",
        async ({ body, set }) => {
          const subscription = await model.subscription.create({
            data: { data: JSON.stringify(body) },
          });

          set.status = 201;
          return {
            message: `Subscription with id [${subscription.id}] created successfully.`,
            data: subscription,
          };
        },
        {
          body: t.Object({
            vapidKeys: t.Object({
              publicKey: t.String(),
              privateKey: t.String(),
            }),
            pushSubscription: t.Object({
              endpoint: t.String(),
              expirationTime: t.Nullable(t.String()),
              keys: t.Required(
                t.Object({
                  p256dh: t.String(),
                  auth: t.String(),
                })
              ),
            }),
          }),
          detail: {
            tags: ["Subscription"],
            summary: "store",
            description: "Create a new subscription data.",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      vapidKeys: {
                        publicKey:
                          "BFfc5Yjj4oYdha-UHRAEywVseJ1XlBQ-wHwOyfXRBaDmlFLMRqF0GqZmYa1vnybQE5M3haMBSfkzDfIUHb61mqE",
                        privateKey:
                          "OZfJrulhoImsCTAHoxVu2uIclN7EH4l_Jvw89YxLnBY",
                      },
                      pushSubscription: {
                        endpoint:
                          "https://fcm.googleapis.com/fcm/send/cqW3XkrCjIY:APA91bHVn6Gt7D88ATKg3QdZNls8xhuAaNH67hCKTtHCPr5vc8OsiaIRn4SgfN_qGG_fA7sgzYp50YS6Al0yevJIvOZsAjApEUUGSZ9kGDvXSQx6898034pR2ztG0bImXKTOblp-zb_S",
                        expirationTime: null,
                        keys: {
                          p256dh:
                            "BLaHiYX3Yl0zDUdbDGAiOFwUjCFq8bC4cXjOZhktTl9iWYu1_Mx8Vng654NYj7FXz4OovRqTqaSiLH7okqVQ5tg",
                          auth: "VWELEIKH1-QKulLvFYpA7w",
                        },
                      },
                    },
                  },
                },
              },
            },
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
                      example: 827,
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
                      example: "Mon, 08 Jul 2024 07:38:57 GMT",
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
                        message:
                          "Subscription with id [095188ee-a766-49d1-9532-c4c75dfe0efc] created successfully.",
                        data: {
                          id: "095188ee-a766-49d1-9532-c4c75dfe0efc",
                          data: '{"vapidKeys":{"publicKey":"BFfc5Yjj4oYdha-UHRAEywVseJ1XlBQ-wHwOyfXRBaDmlFLMRqF0GqZmYa1vnybQE5M3haMBSfkzDfIUHb61mqE","privateKey":"OZfJrulhoImsCTAHoxVu2uIclN7EH4l_Jvw89YxLnBY"},"pushSubscription":{"endpoint":"https://fcm.googleapis.com/fcm/send/cqW3XkrCjIY:APA91bHVn6Gt7D88ATKg3QdZNls8xhuAaNH67hCKTtHCPr5vc8OsiaIRn4SgfN_qGG_fA7sgzYp50YS6Al0yevJIvOZsAjApEUUGSZ9kGDvXSQx6898034pR2ztG0bImXKTOblp-zb_S","expirationTime":null,"keys":{"p256dh":"BLaHiYX3Yl0zDUdbDGAiOFwUjCFq8bC4cXjOZhktTl9iWYu1_Mx8Vng654NYj7FXz4OovRqTqaSiLH7okqVQ5tg","auth":"VWELEIKH1-QKulLvFYpA7w"}}}',
                          created_at: "2024-07-08T07:38:57.615Z",
                          updated_at: "2024-07-08T07:38:57.615Z",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }
      )
      .get(
        "/:id",
        async ({ params: { id }, set }) => {
          const subscription = await model.subscription.findFirst({
            where: { id },
          });

          if (subscription === null) {
            set.status = 404;
            return { message: "No Subscription found" };
          }

          return { data: subscription };
        },
        {
          params: t.Object({ id: t.String() }),
          detail: {
            tags: ["Subscription"],
            summary: "show",
            description:
              "Get a specified subscription data based on the given id.",
            parameters: [
              {
                name: "id",
                in: "path",
                schema: {
                  type: "string",
                },
                required: true,
                example: "095188ee-a766-49d1-9532-c4c75dfe0efc",
              },
            ],
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
                      example: 733,
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
                      example: "Mon, 08 Jul 2024 07:47:02 GMT",
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
                          id: "095188ee-a766-49d1-9532-c4c75dfe0efc",
                          data: '{"vapidKeys":{"publicKey":"BFfc5Yjj4oYdha-UHRAEywVseJ1XlBQ-wHwOyfXRBaDmlFLMRqF0GqZmYa1vnybQE5M3haMBSfkzDfIUHb61mqE","privateKey":"OZfJrulhoImsCTAHoxVu2uIclN7EH4l_Jvw89YxLnBY"},"pushSubscription":{"endpoint":"https://fcm.googleapis.com/fcm/send/cqW3XkrCjIY:APA91bHVn6Gt7D88ATKg3QdZNls8xhuAaNH67hCKTtHCPr5vc8OsiaIRn4SgfN_qGG_fA7sgzYp50YS6Al0yevJIvOZsAjApEUUGSZ9kGDvXSQx6898034pR2ztG0bImXKTOblp-zb_S","expirationTime":null,"keys":{"p256dh":"BLaHiYX3Yl0zDUdbDGAiOFwUjCFq8bC4cXjOZhktTl9iWYu1_Mx8Vng654NYj7FXz4OovRqTqaSiLH7okqVQ5tg","auth":"VWELEIKH1-QKulLvFYpA7w"}}}',
                          created_at: "2024-07-08T07:38:57.615Z",
                          updated_at: "2024-07-08T07:38:57.615Z",
                        },
                      },
                    },
                  },
                },
              },
              "404": {
                description: "Not Found",
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
                      example: 35,
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
                      example: "Mon, 08 Jul 2024 07:44:51 GMT",
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
                        message: "No Subscription found",
                      },
                    },
                  },
                },
              },
            },
          },
        }
      )
      .post(
        "/:id/send-notification",
        async ({ params: { id }, body: { title, options }, set }) => {
          const subscription = await model.subscription.findFirst({
            where: { id },
          });

          if (subscription === null) {
            set.status = 404;
            return { message: "No Subscription found" };
          }

          const data: SubscriptionData = JSON.parse(subscription.data);

          const response = await webpush.sendNotification(
            data.pushSubscription,
            JSON.stringify({ title, options }),
            {
              vapidDetails: {
                subject: "mailto:ngodingbang@gmail.com",
                publicKey: data.vapidKeys.publicKey,
                privateKey: data.vapidKeys.privateKey,
              },
            }
          );

          return {
            data: { subscription, response },
          };
        },
        {
          body: t.Object({
            title: t.String(),
            options: t.Partial(
              t.Object({
                badge: t.String(),
                body: t.String(),
                data: t.Any(),
                dir: t.Union([
                  t.Literal("auto"),
                  t.Literal("ltr"),
                  t.Literal("rtl"),
                ]),
                icon: t.String(),
                lang: t.String(),
                requireInteraction: t.Boolean(),
                silent: t.Nullable(t.Boolean()),
                tag: t.String(),
              })
            ),
          }),
          detail: {
            tags: ["Subscription"],
            summary: "send notification",
            description:
              "Sending notifications to specified subscription list.",
            requestBody: {
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    example: {
                      title: "Test Notification from API",
                      options: {
                        body: "This is the content of the notification.",
                      },
                    },
                  },
                },
              },
            },
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
                      example: 1514,
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
                      example: "Mon, 08 Jul 2024 10:48:20 GMT",
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
                          subscription: {
                            id: "80b51340-a205-492a-a3a4-1cd68ddf620d",
                            data: '{"vapidKeys":{"publicKey":"BPTEFNQu9F7iGStqZeh-KeeDM9t2FdckPRXfSbp1UnM94DAYy-aMmdbKmOgjAVed4lmF1fKR_c8PnuFV1cSeXrY","privateKey":"MhLakO7HkDMEMb77E5wSVNTdpLuUr6QPicbnUPj3Hg0"},"pushSubscription":{"endpoint":"https://fcm.googleapis.com/fcm/send/c-xPt-0nSwM:APA91bFOAjuyHZbgS5VIws2AWUFf645ouxXL06X3i7Cg1f1jCoO2_1pUgN7ML0fEhXBsaZLl7kdgALqvHqEC5JBUk4-sU8emnC1iUmteh-zt0IXRsqqFA5gj5HKMJwUb0kJ8n9jgKcGK","expirationTime":null,"keys":{"p256dh":"BIc-Hg_lMPuiJlEPZ8DLQKjedi93fFKM3KYP2h9nFwPVjbZ3oa6AvKh8aYyKo8UkUh6SF09jrsy_KD-StZvXNA4","auth":"fBURMc4lV-sduv1-stNHtg"}}}',
                            created_at: "2024-07-10T13:43:26.124Z",
                            updated_at: "2024-07-10T13:43:26.124Z",
                          },
                          response: {
                            statusCode: 201,
                            body: "",
                            headers: {
                              "content-security-policy-report-only":
                                "script-src 'none'; form-action 'none'; frame-src 'none'; report-uri https://csp.withgoogle.com/csp/goa-520bfc14",
                              "cross-origin-opener-policy-report-only":
                                'same-origin; report-to="goa-520bfc14"',
                              location:
                                "https://fcm.googleapis.com/0:1720619445900512%ce96710ef9fd7ecd",
                              "report-to":
                                '{"group":"goa-520bfc14","max_age":2592000,"endpoints":[{"url":"https://csp.withgoogle.com/csp/report-to/goa-520bfc14"}]}',
                              "x-content-type-options": "nosniff",
                              "x-frame-options": "SAMEORIGIN",
                              "x-xss-protection": "0",
                              date: "Wed, 10 Jul 2024 13:50:45 GMT",
                              "content-length": "0",
                              "content-type": "text/html; charset=UTF-8",
                              "alt-svc":
                                'h3=":443"; ma=2592000,h3-29=":443"; ma=2592000',
                            },
                          },
                        },
                      },
                    },
                  },
                },
              },
            },
          },
        }
      )
      .delete(
        "/:id",
        async ({ params: { id }, set }) => {
          let subscription = await model.subscription.findFirst({
            where: { id },
          });

          if (subscription === null) {
            set.status = 404;
            return { message: "No Subscription found" };
          }

          subscription = await model.subscription.delete({
            where: { id },
          });

          return {
            message: "Subscription deleted successfully",
            data: subscription,
          };
        },
        {
          params: t.Object({ id: t.String() }),
          detail: {
            tags: ["Subscription"],
            summary: "destroy",
            description:
              "Delete a specified subscription data based on the given id.",
            parameters: [
              {
                name: "id",
                in: "path",
                schema: {
                  type: "string",
                },
                required: true,
                example: "095188ee-a766-49d1-9532-c4c75dfe0efc",
              },
            ],
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
                      example: 779,
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
                      example: "Mon, 08 Jul 2024 07:50:07 GMT",
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
                        message: "Subscription deleted successfully",
                        data: {
                          id: "095188ee-a766-49d1-9532-c4c75dfe0efc",
                          data: '{"vapidKeys":{"publicKey":"BFfc5Yjj4oYdha-UHRAEywVseJ1XlBQ-wHwOyfXRBaDmlFLMRqF0GqZmYa1vnybQE5M3haMBSfkzDfIUHb61mqE","privateKey":"OZfJrulhoImsCTAHoxVu2uIclN7EH4l_Jvw89YxLnBY"},"pushSubscription":{"endpoint":"https://fcm.googleapis.com/fcm/send/cqW3XkrCjIY:APA91bHVn6Gt7D88ATKg3QdZNls8xhuAaNH67hCKTtHCPr5vc8OsiaIRn4SgfN_qGG_fA7sgzYp50YS6Al0yevJIvOZsAjApEUUGSZ9kGDvXSQx6898034pR2ztG0bImXKTOblp-zb_S","expirationTime":null,"keys":{"p256dh":"BLaHiYX3Yl0zDUdbDGAiOFwUjCFq8bC4cXjOZhktTl9iWYu1_Mx8Vng654NYj7FXz4OovRqTqaSiLH7okqVQ5tg","auth":"VWELEIKH1-QKulLvFYpA7w"}}}',
                          created_at: "2024-07-08T07:38:57.615Z",
                          updated_at: "2024-07-08T07:38:57.615Z",
                        },
                      },
                    },
                  },
                },
              },
              "404": {
                description: "Not Found",
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
                      example: 35,
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
                      example: "Mon, 08 Jul 2024 07:49:07 GMT",
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
                        message: "No Subscription found",
                      },
                    },
                  },
                },
              },
            },
          },
        }
      )
  )
  .listen(3000);

console.info(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
