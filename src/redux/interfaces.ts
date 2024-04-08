import { categoryTypes, itemTypes, userTypes } from "../types/interface";

export interface initialStateTypes {
  user: userTypes,
  item: itemTypes,
  items: itemTypes[],
  category:categoryTypes,
  categories:categoryTypes[],
}
