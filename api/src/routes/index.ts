import { Elysia } from "elysia";
import generateVapidKeys from "./homepage/generate-vapid-keys";
import helloWorld from "./homepage/hello-world";
import destroy from "./subscriptions/destroy";
import subscriptionIndex from "./subscriptions/index";
import subscriptionSendNotification from "./subscriptions/send-notification";
import subscriptionSendNotifications from "./subscriptions/send-notifications";
import subscriptionShow from "./subscriptions/show";
import subscriptionStore from "./subscriptions/store";

export default new Elysia()
  .use(helloWorld)
  .use(generateVapidKeys)
  .group("/subscriptions", (app) =>
    app
      .use(subscriptionIndex)
      .use(subscriptionStore)
      .use(subscriptionSendNotifications)
      .use(subscriptionShow)
      .use(subscriptionSendNotification)
      .use(destroy)
  );
