import { NextApiRequest, NextApiResponse } from "next";
import webPush from "web-push";

const publicVapidKey = process.env.NEXT_PUBLIC_VAPID_KEY;
const privateVapidKey = process.env.PRIVATE_VAPID_KEY;

webPush.setVapidDetails(
  "mailto:maziar9170@gmail.com",
  publicVapidKey!,
  privateVapidKey!,
);

let subscriptions: any[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log('req');

  if (req.method === "POST") {
    const notificationPayload = {
      title: "Review Time",
      body: "It's time to review some items.",
      icon: "/favicon/favicon.ico",
    };

    const sendNotifications = async () => {
      subscriptions.forEach((subscription) => {
        webPush
          .sendNotification(subscription, JSON.stringify(notificationPayload))
          .catch((err) => console.error("Error sending notification:", err));
      });
    };

    await sendNotifications();
    res.status(200).json({ message: "Notifications sent" });
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
