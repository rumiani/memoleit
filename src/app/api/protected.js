// pages/api/protected.js
import { getSession } from "next-auth/client";
import { verifyToken } from "../../lib/jwt";

const protectedHandler = async (req, res) => {
  const session = await getSession({ req });

  if (!session) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = verifyToken(token);

  if (!decodedToken) {
    return res.status(401).json({ message: "Invalid token" });
  }

  // Your protected logic here
  res.status(200).json({ message: "Success" });
};
export default protectedHandler;
