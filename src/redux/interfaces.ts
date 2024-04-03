import { catagoryTypes, itemTypes, userTypes } from "../types/interface";

export interface initialStateTypes {
  user: userTypes,
  item: itemTypes,
  items: itemTypes[]
  catagories:catagoryTypes[]
}
