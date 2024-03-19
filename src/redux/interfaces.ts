export interface initialStateTypes {
  user: {
    isAuth: boolean;
    username: string;
    uid: string;
    isModerator: boolean;
    catagories: object;
    items: [];
  };
  item: {
    id: string;
    title: string;
    description: string;
    subject: string;
    createdAt: string;
    learned: boolean;
    days: number;
    shouldReview: boolean;
  };
}
