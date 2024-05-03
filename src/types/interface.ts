export interface ItemTypes {
  id: string;
  title: string;
  body: string;
  category: string;
  createdAt: number;
  reviews: {
    box: number;
    review: number;
    lastReviewDate: number;
  };
}
export interface CategoryTypes {
  id: string;
  name: string;
  status: boolean;
  createdAt: number;
}
export interface SettingTypes {
  reviewSounds: {
    isSoundOn: false;
    right: 0;
    wrong: 0;
  };
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
}
export interface ReviewSoundsTypes {
  right: { name: number; sound: HTMLAudioElement }[];
  wrong: { name: number; sound: HTMLAudioElement }[];
}
export interface UserInfo {
  lastVisit:string;
  rightTimestamps:string;
  wrongTimestamps:string;
  itemsHistory:number
}
export interface AppDataTypes {
  userInfo:UserInfo;
  settings: SettingTypes;
  categories: CategoryTypes[];
  itemsData: ItemTypes[]
}