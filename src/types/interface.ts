import { IconType } from "react-icons";

export interface ItemTypes {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  body: string;
  category: string;
  box: number;
  createdAt: number;
  lastReview: number;
}

export interface FormDataTypes {
  id: string;
  userId: string;
  categoryId: string;
  title: string;
  body: string;
  category: string;
  box: number;
  createdAt: number;
  lastReview: number;
}

export interface CategoryTypes {
  id: string;
  userId: string;
  name: string;
  status: boolean;
  createdAt: number;
}
export interface ReviewTypes {
  id: string;
  userId: string;
  itemId: string;
  answer: number;
  createdAt: number;
}
export interface wordListTypes {
  name: string;
  lable: string;
  status: boolean;
  words: string[];
}
export interface SettingTypes {
  id: string;
  name: string;
  userId: string;
  isReviewSoundOn: boolean;
  rightAnswerSoundSrc: string;
  wrongAnswerSoundSrc: string;
  selectAllCategories: boolean;
  isTextToSpeechOn: boolean;
  textToSpeechLang: string;
  isDictionaryOn: boolean;
  leitnerTextSelectionMode: boolean;
  wordLists: wordListTypes[];
  tour: { reviewTour: boolean; newItemTour: boolean; boxTour: boolean };
}
export interface UserTypes {
  id: string;
  isAuth: boolean;
  username: string;
  avatar: string;
  name: string;
  email: string;
  isModerator: boolean;
  role: string;
  joinTime: string;
  isLoggedIn: boolean;
}
export interface FormValues {
  title: string;
  body: string;
  category: string;
  categoryId: string;
}
export interface EssayValues {
  topic: string;
  body: string;
  type: "general" | "academic";
  task: "one" | "two";
}

export interface ItemsInfoTypes {
  allItemsCount: number;
  learnedCount: number;
  unLearnedCount: number;
  pending: number;
}
export interface LanguagesTypes {
  name: string;
  code: string;
}
export interface PdfDBTypes {
  id: string;
  name: string;
  pdfName: string;
  file?: Blob;
  lastVisitedPage: number;
  numberOfPages: number;
  createdAt: number;
}
export interface PdfStateTypes {
  id: string;
  name: string;
  pdfName: string;
  url: string;
  lastVisitedPage: number;
  numberOfPages: number;
  createdAt: number;
}
export interface DefinitionsTyps {
  definition: string;
  example: string;
  synonyms: string[];
  antonyms: string[];
}
export interface MeaningTypes {
  definitions: DefinitionsTyps[];
  partOfSpeech: string;
  synonyms: string[];
  antonyms: string[];
}
export interface LookUpResultTypes {
  phonetic: string;
  meanings: MeaningTypes[];
  phonetics: { text: string; audio: string }[];
}
export interface LinksTypes {
  url: string;
  lable: string;
  name: string;
}
export interface SuperPageTypes {
  name: string;
  lable: string;
  icon: IconType;
  links: LinksTypes[];
}

export interface EssayEvaluation  {
  taskAchievement: {title:string,value:string};
  coherenceAndCohesion: {title:string,value:string};
  lexicalResource: {title:string,value:string};
  grammaticalRangeAndAccuracy: {title:string,value:string};
  suggestions:{title:string,value:string};
  score: {title:string,value:string};
  isRelatedToTopic: boolean;
};