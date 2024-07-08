/// <reference no-default-lib="true"/>
/// <reference lib="esnext" />
/// <reference lib="webworker" />

console.info("Service worker registered successfully.");

/** @typedef {{
  data: {
    publicKey: string;
    privateKey: string;
  }
}} VapidKeysResponse */
/** @type {ServiceWorkerGlobalScope & typeof globalThis} */
const sw = self;

/**
 * @param {string} base64String
 */
const urlBase64ToUint8Array = (base64String) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, "+")
    .replace(/_/g, "/");
  const rawData = atob(base64);

  const result = new Uint8Array(rawData.length);

  for (let index = 0; index < rawData.length; ++index) {
    result[index] = rawData.charCodeAt(index);
  }

  return result;
};

const generateVapidKeys = async () => {
  const response = await fetch("http://localhost:3000/generate-vapid-keys");
  /** @type {VapidKeysResponse} */
  const json = await response.json();

  return json?.data;
};

/**
 * @param {VapidKeysResponse} vapidKeys
 * @param {PushSubscription} pushSubscription
 */
const sendSubscription = async (vapidKeys, pushSubscription) => {
  const body = JSON.stringify({ vapidKeys, pushSubscription });
  const response = await fetch("http://localhost:3000/subscriptions", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body,
  });

  return response.json();
};

sw.addEventListener("activate", async (event) => {
  const vapidKeys = await generateVapidKeys();

  const subscription = await sw.registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(vapidKeys?.publicKey),
  });

  await sendSubscription(vapidKeys, subscription);
});

self.addEventListener("push", (event) => {
  /** @type {{ title: string; options: NotificationOptions; }} */
  const data = event.data.json();

  self.registration.showNotification(data.title, data.options);
});
