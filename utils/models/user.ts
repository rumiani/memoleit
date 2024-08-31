import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String,  required: true, unique: true },
  image: { type: String},
  provider: { type: String, required: true },
  providerId: { type: String, required: true, unique: true },
  accessToken: { type: String, required: true },
  Role: { type: String, default: "user" },
  isActive:{type: Boolean, default: true},
  joinedDate: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);

export default User;
