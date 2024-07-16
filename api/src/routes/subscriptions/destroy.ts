import { Elysia, t } from "elysia";
import { model } from "../../models";

export default new Elysia().delete(
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
);
