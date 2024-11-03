import {
  CategoryTypes,
  EssayFormValues,
  EssayObjectTypes,
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
  translatingItems: { [key: string]: LookUpResultTypes[] };
  generatedStory: string;
}
export interface initialCategoryStateTypes {
  category: CategoryTypes;
  categories: CategoryTypes[];
  categoryOnEdit: string;
}
export interface initialPdfStateTypes {
  pdf: PdfStateTypes;
  pdfs: PdfStateTypes[];
  pdfOnEdit: string;
}
export interface initialEssayTypes {
  essay: EssayFormValues;
  essayObject: EssayObjectTypes;
  allEssays:EssayObjectTypes[];
}
