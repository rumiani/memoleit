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
export interface CategoryTypes {
  id: string;
  userId: string;
  name: string;
  status: number;
  createdAt: number;
}
export interface ReviewTypes {
  id: string;
  userId: string;
  itemId: string;
  answer: number;
  createdAt: number;
}
export interface SettingTypes {
  id: string;
  name: string;
  userId: string;
  isReviewSoundOn: boolean;
  rightAnswerSoundSrc: string;
  wrongAnswerSoundSrc: string;
  isTextToSpeechOn: boolean;
  isDictionaryOn: boolean;
  isTourOn: boolean;
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
  categoryId:string;
}
