import {
  CategoryTypes,
  ItemTypes,
  SettingTypes,
  UserTypes,
} from "../types/interface";

export interface initialUserStateTypes {
  user: UserTypes;
}
export interface initialItemStateTypes {
  item: ItemTypes;
  items: ItemTypes[];
}
export interface initialCategoryStateTypes {
  category: CategoryTypes;
  categories: CategoryTypes[];
  categoryNameEditable: string;
}

export interface initialSettingTypes {
  setting: SettingTypes;
}
