import { Schema, Document, Model, models, model } from "mongoose";

interface IUser extends Document {
  clerkId: string;
  name: string;
  username: string;
  email: string;
  password?: string;
  picture: string;
  bio?: string;
  location?: string;
  portfolioWebsite?: string;
  respectScore?: number;
  savedPost: Schema.Types.ObjectId[];
  joinedAt: Date;
}

const UserSchema = new Schema<IUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  picture: { type: String, required: true },
  bio: { type: String },
  location: { type: String },
  portfolioWebsite: { type: String },
  respectScore: { type: Number },
  savedPost: [{ type: Schema.Types.ObjectId, ref: "Question" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model<IUser>("User", UserSchema);
export default User;
