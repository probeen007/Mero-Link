import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: String,
  email: { type: String, index: true },
  image: String,
  emailVerified: Date,
  isVerified: { type: Boolean, default: false },
});

export const User = models?.User || model('User', UserSchema);
