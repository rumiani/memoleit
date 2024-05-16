import { isEmpty } from "lodash";
import { CategoryTypes, ItemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { timeToNowHandler } from "./home/general/timeToNowHandler";
type ReviewBoxesType = {
  [key: number]: number;
};
const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };

export const notificationReviewHandler = () => {
  if (typeof window !== "undefined") {
    const { itemsData, categories } = getAppDataHandler();
    if (itemsData.length > 0) {
      const itemsToReview = itemsData.filter((item: ItemTypes) => {
        const daysSinceReviewed = timeToNowHandler(item.lastReview).days;
        const category = categories.find(
          (category: CategoryTypes) => category.name === item.category
        );
        // conditions
        const isInTheBox = item.box < 6;
        const isTimeToReview = daysSinceReviewed >= reviewBoxes[item.box];

        return category?.status && isInTheBox && isTimeToReview;
      });

      if (isEmpty(itemsToReview)) {
        if ("Notification" in window) {
          // Request permission from the user to display notifications
          Notification.requestPermission().then(function (permission) {
            console.log(permission);
            // Permission can be 'granted', 'denied', or 'default'
            if (permission === "granted") {
              // Create a notification
              let notification = new Notification("Hello, World!", {
                body: "This is a notification from your website.",
                icon: "path/to/icon.png", // Optional: Icon URL
              });

              // Optional: Handle click event on the notification
              notification.onclick = function () {
                // Handle notification click event
                console.log("Notification clicked");
              };
            }
          });
        }
      }
    }
  }
};
