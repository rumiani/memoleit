import { toast } from "react-toastify";
import { getAppDataHandler } from "./getAppDataHandler";

export const saveTopicsToLocal = (catagories:{}) =>{
    const appData = getAppDataHandler();
    appData.catagories = {...appData.catagories, ...catagories};
    localStorage.setItem("appData", JSON.stringify(appData));
    toast.success("New filters have been saved.");
}