import storeToLocal from "@/src/app/components/home/review/storeToLocal";
import { randomItemHandler } from "./randomItemHandler";
import { toast } from 'react-toastify';

export const removeHandler = (id: string) => {
  console.log(id);
  const items = storeToLocal();
  const restItems = items.filter((item) => item.id !== id);
  localStorage.setItem("itemsData", JSON.stringify(restItems));
  toast.success('The item was removed.', {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    });
  return randomItemHandler(storeToLocal());
};
