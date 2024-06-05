import {
  CategoryTypes,
  FormDataTypes,
  ItemTypes,
  UserTypes,
} from "../types/interface";

export interface initialUserStateTypes {
  user: UserTypes;
}
export interface initialItemStateTypes {
  item: ItemTypes;
  formData: FormDataTypes;
  items: ItemTypes[];
}
export interface initialCategoryStateTypes {
  category: CategoryTypes;
  categories: CategoryTypes[];
  categoryOnEdit: string;
}
