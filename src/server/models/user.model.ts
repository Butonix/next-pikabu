import {
  UserDocument,
  VoteCommentDocument,
  VotePostDocument,
} from "@shared/types/documents";
import mongoose, { Schema, model } from "mongoose";

const VotePostSchema = new Schema<VotePostDocument>({
  post_id: { type: Schema.Types.ObjectId, ref: "Post" },
  value: Number,
});
const VoteCommentSchema = new Schema<VoteCommentDocument>({
  comment_id: { type: Schema.Types.ObjectId, ref: "Post" },
  value: Number,
});
const UserSchema = new Schema<UserDocument>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    rating: { type: Number, default: 100 },
    follower_count: { type: Number, default: 0 },
    avatar: String,
    rated_posts: [VotePostSchema],
    rated_comments: [VoteCommentSchema],
    followed_people_ids: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // followed_people_ids: [
    //   user_id: { type: Schema.Types.ObjectId, ref: "User" }
    // ],
    followed_community_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: "Community",
      },
    ],
  },
  { timestamps: true }
);

export const UserModel: mongoose.Model<UserDocument> =
  mongoose.models.User || model<UserDocument>("User", UserSchema);
