import { Elysia, t } from "elysia";
import webpush from "web-push";
import { model } from "../../models";
import { SubscriptionData } from "../../types";

export default new Elysia().post(
  "/send-notifications",
  async ({ body: { title, options } }) => {
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
          dir: t.Union([t.Literal("auto"), t.Literal("ltr"), t.Literal("rtl")]),
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
);
