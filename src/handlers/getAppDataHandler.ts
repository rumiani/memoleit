export const getAppDataHandler = () => {
  if (typeof window !== "undefined") {
    const appDataJson: string  = localStorage.getItem("appData")!;        
    return JSON.parse(appDataJson);
  }
};
