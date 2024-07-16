import swagger from "@elysiajs/swagger";

export default swagger({
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
});
