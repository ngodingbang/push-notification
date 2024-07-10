const subscribeElement = document.getElementById("subscribe");
const messageElement = document.getElementById("message");
const sendNotificationElement = document.getElementById("send-notification");

/** @type {Notification} */
let notification;
/** @type {number} */
let interval;

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

const registerServiceWorker = () => {
  if (!"serviceWorker" in navigator) {
    throw new Error("Service worker is not supported.");
  }

  return navigator.serviceWorker.register("/web/service-worker.js");
};

document.addEventListener("DOMContentLoaded", async () => {
  initiateElement();
});

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

    await registerServiceWorker();

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
    ? `http://localhost:3000/subscriptions/${formData.get(
        "subscription-id"
      )}/send-notification`
    : "http://localhost:3000/subscriptions/send-notifications";

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
