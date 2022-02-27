import { UserDocument } from "@shared/types/documents";
import mongoose, { Schema, model } from "mongoose";

const userSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    rating: Number,
    avatar: String,
    // posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],
    // comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.User || model<UserDocument>("User", userSchema);
