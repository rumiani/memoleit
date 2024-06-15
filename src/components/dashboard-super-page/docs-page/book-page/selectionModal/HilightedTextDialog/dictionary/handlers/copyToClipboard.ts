import { toast } from "react-toastify";

export const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard!");
  } catch (err) {
    console.error("Failed to copy: ", err);
    toast.error("Failed to copy text to clipboard");
  }
};
