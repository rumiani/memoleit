export const timeToNowHandler = (time: number) => {
  const currentDate = new Date().getTime();
  const timeDifference = currentDate - time;
  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));  
  const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const min =  Math.floor(timeDifference / (1000 * 60 )) % 60;
  const startedDate = new Date(time);
  const daysSuffix = days > 1 ? " Days ago" : " Day ago";
  const hoursSuffix = hours > 1 ? " Hours ago" : " Hour ago";
  const daysHoursAgo = days === 0 ? hours + hoursSuffix : days + daysSuffix;
  return { min, hours, days, daysHoursAgo, startedDate };
};
