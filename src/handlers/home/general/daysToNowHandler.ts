export const daysToNowHandler = (time: number) => {
  let currentDate = new Date().getTime();
  let startedDate = new Date(time).getTime();
  let timeDifference = currentDate - startedDate;
  let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

  return days;
};
