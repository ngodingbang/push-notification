import { Elysia, t } from "elysia";
import { model } from "../../models";

export default new Elysia().post(
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
                  privateKey: "OZfJrulhoImsCTAHoxVu2uIclN7EH4l_Jvw89YxLnBY",
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
);
