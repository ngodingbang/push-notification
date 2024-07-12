const subscribeElement = document.getElementById("subscribe");
const messageElement = document.getElementById("message");
const sendNotificationElement = document.getElementById("send-notification");

/** @typedef {{
  data: {
    publicKey: string;
    privateKey: string;
  }
}} VapidKeysResponse */

/** @type {Notification} */
let notification;
/** @type {number} */
let interval;

const apiBaseUrl = "https://localhost:3000";

const modifySubscribeElement =
  /**
   * @param {{ enabled: boolean; textContent: string; }} params
   */
  (params) => {
    if (params?.enabled) {
      subscribeElement.removeAttribute("disabled");
    } else {
      subscribeElement.setAttribute("disabled", "disabled");
    }

    subscribeElement.textContent = params?.textContent || "Subscribe";
  };

const initiateElement = () => {
  if ("Notification" in window && Notification.permission === "granted") {
    modifySubscribeElement({ textContent: "Subscribed" });
  } else if ("Notification" in window && Notification.permission === "denied") {
    modifySubscribeElement();
  } else if (
    "Notification" in window &&
    Notification.permission === "default"
  ) {
    modifySubscribeElement({ enabled: true });
  }

  messageElement.textContent = `Permission is ${Notification.permission}.`;
};

/**
 * @returns {Promise<ServiceWorkerRegistration>}
 */
const registerServiceWorker = async () => {
  if (!"serviceWorker" in navigator) {
    throw new Error("Service worker is not supported.");
  }

  await navigator.serviceWorker.register("/service-worker.js");

  return navigator.serviceWorker.ready;
};

document.addEventListener("DOMContentLoaded", async () => {
  initiateElement();
});

const getToken = async () => {
  const vapidKeys = await generateVapidKeys();

  if (!vapidKeys?.publicKey) {
    throw new Error("Public key is not available.");
  }

  return vapidKeys;
};

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

/**
 * @param {string} url
 */
const generateVapidKeys = async (url) => {
  const response = await fetch(url || `${apiBaseUrl}/generate-vapid-keys`);
  /** @type {VapidKeysResponse} */
  const json = await response.json();

  return json?.data;
};

/**
 * @param {VapidKeysResponse} vapidKeys
 * @param {PushSubscription} pushSubscription
 */
const postSubscription = async (vapidKeys, pushSubscription) => {
  const body = JSON.stringify({ vapidKeys, pushSubscription });
  return fetch(`${apiBaseUrl}/subscriptions`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body,
  });
};

subscribeElement.addEventListener("click", async () => {
  try {
    if (!"Notification" in window) {
      throw new Error("Notification API is not supported.");
    }

    const permission = await Notification.requestPermission();

    messageElement.textContent = `Permission is ${permission}.`;

    if (permission !== "granted") {
      modifySubscribeElement({ textContent: "Subscribe" });

      throw new Error("Permission is denied.");
    }

    modifySubscribeElement({ textContent: "Subscribed" });

    const serviceWorkerRegistration = await registerServiceWorker();

    const vapidKeys = await getToken();
    const subscription = await serviceWorkerRegistration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidKeys?.publicKey),
    });

    const response = await postSubscription(vapidKeys, subscription);
    const json = await response.json();

    if (json?.message) {
      console.info(json.message);
    }

    new Notification("Notification test", {
      tag: "permission-granted",
      body: "Permission is granted.",
    });
  } catch (error) {
    messageElement.textContent = error.message;

    throw error;
  }
});

sendNotificationElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = new FormData(event.target);
  const url = formData.get("subscription-id")
    ? `${apiBaseUrl}/subscriptions/${formData.get(
        "subscription-id"
      )}/send-notification`
    : `${apiBaseUrl}/subscriptions/send-notifications`;

  try {
    const response = await fetch(url, {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formData.get("title"),
        options: {
          body: formData.get("body"),
          tag: formData.get("tag"),
        },
      }),
    });

    if (response.status !== 200) {
      messageElement.textContent = "Notification sent succesfully.";
    }
  } catch (error) {
    messageElement.textContent = "Notification failed to sent.";

    throw error;
  }
});

// document.addEventListener("visibilitychange", () => {
//   if (document.visibilityState !== "hidden") {
//     interval && clearInterval(interval);
//     notification && notification.close();

//     return;
//   }

//   const now = new Date();

//   interval = setInterval(() => {
//     notification = new Notification(
//       "Please come back to the page",
//       {
//         tag: "return-to-page",
//         body: `You've been gone for ${Math.round(
//           (new Date() - now) / 1000
//         )} seconds.`,
//       },
//       1000
//     );
//   });
// });
