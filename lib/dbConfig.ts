import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;
if (!MONGODB_URI) throw new Error("MONGODB_URI must be defined");
const opts = {
  bufferCommands: false,
  serverSelectionTimeoutMS: 5000, // Increase the timeout to 5000ms (5 seconds)
};
export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(MONGODB_URI, opts);
    if (connection.readyState === 1) {
      console.log("10:MongoDB Connected");
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error("-------", error);
    return Promise.reject(error);
  }
};
