import { categoryTypes, itemTypes, userTypes } from "../types/interface";

export interface initialStateTypes {
  user: userTypes,
  item: itemTypes,
  items: itemTypes[],
}
export interface initialCategoryStateTypes {
  category:categoryTypes,
  categories:categoryTypes[],
  categoryNameEditable:boolean
}
