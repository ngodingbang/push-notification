/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

console.info("Service worker registered successfully.");

/** @type {ServiceWorkerGlobalScope & typeof globalThis} */
const sw = self;

sw.addEventListener("push", (event) => {
  /** @type {{ title: string; options: NotificationOptions; }} */
  const data = event.data.json();

  self.registration.showNotification(data.title, data.options);
});
