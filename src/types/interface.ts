export interface itemTypes {
  id: string;
  title: string;
  body: string;
  catagory: string;
  createdAt: number;
  reviews: {
    box: number;
    review:number,
    lastReviewDate: number;
  };
}
export interface catagoryTypes {
  name: string;
  status: boolean;
  createdAt:number
}
export interface userTypes {
  id: string;
  isAuth: boolean;
  username: string;
  avatar: string;
  name: string;
  email: string;
  isModerator: boolean;
  role: string;
  joinTime: string;
  loggedIn: boolean;
  catagories: object;
  forReview: boolean;
}
export interface FormValues {
  title: string;
  body: string;
  topic: string;
}
