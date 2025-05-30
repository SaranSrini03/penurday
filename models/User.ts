// models/User.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  name: string;
  email: string;
  password: string;
  dob: Date;
  terms: boolean;
  createdAt: Date;
}

const UserSchema: Schema<IUser> = new Schema({
  username: { type: String, required: true, unique: true, trim: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  terms: { type: Boolean, required: true },
  createdAt: { type: Date, default: Date.now },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
