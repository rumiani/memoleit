import { v4 as uuidv4 } from "uuid";
export const randomIdGenerator = (length: number) =>
  uuidv4().substring(0, length);
