export default function notFoundError(message: string): Error {
  return Object.assign(new Error(message), { name: "404" });
}
