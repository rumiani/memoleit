import { itemTypes } from "../../../types/interface";

export const randomElementHandler = (items:itemTypes[]) =>{
    const randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}