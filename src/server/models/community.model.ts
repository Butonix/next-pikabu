import { CommunityDocument } from "@shared/types/documents";
import mongoose, { Schema, model } from "mongoose";

const CommunitySchema = new Schema<CommunityDocument>(
  {
    admin_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    total_posts: { type: Number, required: true },
    total_users: { type: Number, required: true },
    // post_ids: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "Post",
    //   },
    // ],
    // user_ids: [
    //   {
    //     type: Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
    rules: { type: String, required: true },
  },
  { timestamps: true }
);

export const CommunityModel: mongoose.Model<CommunityDocument> =
  mongoose.models.Community ||
  model<CommunityDocument>("Community", CommunitySchema);
