export const timeToNowHandler = (time: number) => {
  const currentDate = new Date().getTime();
  const timeDifference = currentDate - time;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(timeDifference / (1000 * 60 * 60)) % 24;
  const min = Math.floor(timeDifference / (1000 * 60)) % 60;

  const startedDate = new Date(time);

  const minSuffix = days > 0 ? `${days} Minute${days > 1 ? 's' : ''} ago` : '';
  const daysSuffix = days > 0 ? `${days} Day${days > 1 ? 's' : ''} ago` : '';
  const hoursSuffix = hours > 0 ? `${hours} Hour${hours > 1 ? 's' : ''} ago` : '';
  const timeLength = days > 0 ? daysSuffix : hours > 0 ? hoursSuffix : minSuffix;
  return { min, hours, days, timeLength, startedDate };
};
