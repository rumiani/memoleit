self.onmessage = function () {
  setInterval(() => {
    const currentTimestamp = Date.now();
    if (currentTimestamp % 2 === 0) {
        console.log('worker');
      fetch("/api/sendNotification", {
        method: "POST",
      });
    }
  }, 3 * 1000);
};
