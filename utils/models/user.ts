import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  image: String,
  googleId: { type: String, unique: true, required: true },
});

const User = models.User || model("User", UserSchema);

export default User;
