export interface itemTypes {
  id: string,
  title: string,
  body: string,
  createdAt: number,
  learned: boolean,
  days: number,
  shouldReview: boolean,
  length: number,
  catagory:string,
  tags: string[],
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