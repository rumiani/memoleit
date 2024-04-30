"use client";
import { notificationReviewHandler } from "@/src/handlers/notificationReview";

export default function Notification() {
  if (typeof window !== "undefined") {
    const myCallback = (a: string, b: string) => {
      const res = notificationReviewHandler()
      // console.log(res);
    };
    // const intervalID = setInterval(myCallback, 5000);
  }

  return null;
}
