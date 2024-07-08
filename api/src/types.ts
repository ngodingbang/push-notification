export type SubscriptionData = {
  vapidKeys: {
    publicKey: string;
    privateKey: string;
  };
  pushSubscription: {
    endpoint: string;
    expirationTime: string | null;
    keys: {
      p256dh: string;
      auth: string;
    };
  };
};

export type NotificationTitle = string;

export type NotificationOptions = {
  badge?: string;
  body?: string;
  data?: any;
  dir?: "auto" | "ltr" | "rtl";
  icon?: string;
  lang?: string;
  requireInteraction?: boolean;
  silent?: boolean | null;
  tag?: string;
};
