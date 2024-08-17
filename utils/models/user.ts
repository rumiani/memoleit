import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: String,
  provider: { type: String, required: true },
  providerId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  Role: { type: String, default: "user" },
  joinedDate: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
