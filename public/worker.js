self.onmessage = function () {
  const url = process.env.NEXTAUTH_URL;
  setInterval(() => {
    const currentTimestamp = Date.now();
    if (currentTimestamp % 2 === 0) {
      console.log("worker");
      fetch(url + "/api/sendNotification", {
        method: "POST",
      });
    }
  }, 3 * 1000);
};
