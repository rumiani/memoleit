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
  isSoundOn: boolean;
  isDictionaryOn: boolean;
  isTourOn:boolean,
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
