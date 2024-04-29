import { isEmpty } from "lodash";
import { categoryTypes, itemTypes } from "../types/interface";
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
          const itemsToReview = itemsData.filter((item: itemTypes) => {
            const daysSinceReviewed = timeToNowHandler(
              item.reviews.lastReviewDate
            ).days;
            const category = categories.find(
              (category: categoryTypes) => category.name === item.category
            );
            // conditions
            const isInTheBox = item.reviews.box < 6;
            const isTimeToReview =
              daysSinceReviewed >= reviewBoxes[item.reviews.box];
    
            return category?.status && isInTheBox && isTimeToReview;
          });
                    
          if(isEmpty(itemsToReview)){
              if ("Notification" in window) {
                  
                  // Request permission from the user to display notifications
                  Notification.requestPermission().then(function (permission) {
                      console.log(permission);
                    // Permission can be 'granted', 'denied', or 'default'
                    if (permission === "granted") {
                      // Create a notification
                      let notification = new Notification("Hello, World!", {
                        body: "This is a notification from your website.",
                        icon: "path/to/icon.png" // Optional: Icon URL
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
    
