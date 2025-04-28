import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  phoneNumber: string;
  telegramId: number;
  firstName?: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  createdAt: Date;
  lastLogin: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  phoneNumber: { type: String, required: true, unique: true },
  telegramId: { type: Number, required: true },
  firstName: { type: String },
  lastName: { type: String },
  username: { type: String },
  photoUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date, default: Date.now },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
