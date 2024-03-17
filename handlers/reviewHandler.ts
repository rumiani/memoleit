export const reviewHandler = (time : number) => {
    let currentDate = new Date().getTime()
   let createdDate = new Date(time)
    let timeDifference = currentDate - createdDate.getTime();
    let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); 
    let shouldReview = (days === 0) || ((days & (days - 1)) === 0);
    return {days,shouldReview}
}