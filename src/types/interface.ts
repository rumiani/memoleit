export interface itemTypes {
  id: string,
  title: string,
  body: string,
  createdAt: string,
  learned: false,
  days: number,
  shouldReview: false,
  length: number,
  catagory:string,
  tags: string[],
  url: string,
}

export interface userTypes {
  id: string,
  isAuth: boolean,
  username: string,
  avatar: string,
  name: string,
  email: string,
  isModerator: boolean,
  role: string,
  joinTime: string,
  loggedIn: boolean,
  catagories: string[],
}