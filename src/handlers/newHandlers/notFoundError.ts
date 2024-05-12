export default function notFoundError(message: string): Error {
  const error = new Error(message);
  error.name = "404";
  return error;
}
