import { itemTypes } from "../types/interface";
import { getAppDataHandler } from "./getAppDataHandler";
import { timeToNowHandler } from "./home/general/timeToNowHandler";
type ReviewBoxesType = {
  [key: number]: number;
};
interface DataType {
  name: string;
  Reviewed: number;
  Pending: number;
}

export const barChartDataHandler = ({
    category,
    data,
}: {
    category: string | null;
    data: DataType[];
}) => {
    console.log(category);
  const { itemsData } = getAppDataHandler();
  if (category) {
    itemsData.forEach((item: itemTypes) => {
      if (item.category === category) dataModifier(data, item);
    });
  } else {
    itemsData.forEach((item: itemTypes) => dataModifier(data, item));
  }
  return data;
};

const dataModifier = (data: DataType[], item: itemTypes) => {
  const reviewBoxes: ReviewBoxesType = { 1: 1, 2: 2, 3: 4, 4: 8, 5: 16 };
  const daysSinceReviewed = timeToNowHandler(item.reviews.lastReviewDate).days;
  const isTimeToReview = daysSinceReviewed >= reviewBoxes[item.reviews.box];
//   console.log(isTimeToReview);
  
  if (isTimeToReview) {
      
      data[item.reviews.box - 1].Pending += 1;
    } else {
        console.log(data);
        console.log(item);
        
      console.log(data[item.reviews.box - 1]);
    data[item.reviews.box - 1].Reviewed +=1;
  }
};
