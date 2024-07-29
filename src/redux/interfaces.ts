import {
  CategoryTypes,
  FormDataTypes,
  ItemTypes,
  LookUpResultTypes,
  PdfStateTypes,
  UserTypes,
} from "../types/interface";

export interface initialUserStateTypes {
  user: UserTypes;
}
export interface initialItemStateTypes {
  item: ItemTypes;
  formData: FormDataTypes;
  items: ItemTypes[];
  numberOfItemsToReview: number;
  translatingItems:{[key: string]:LookUpResultTypes[]}
}
export interface initialCategoryStateTypes {
  category: CategoryTypes;
  categories: CategoryTypes[];
  categoryOnEdit: string;
}
export interface initialPdfStateTypes {
  pdf: PdfStateTypes;
  pdfs: PdfStateTypes[];
  pdfOnEdit:string;
}
