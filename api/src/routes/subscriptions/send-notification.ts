import { Elysia, t } from "elysia";
import webpush from "web-push";
import { model } from "../../models";
import { SubscriptionData } from "../../types";

export default new Elysia().post(
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
      summary: "send notification",
      description: "Sending notifications to specified subscription list.",
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
);
