import { CommunityDocument } from "@shared/types/documents";
import mongoose, { Schema, model } from "mongoose";
import { TagSchema } from "./tag.model";

const CommunitySchema = new Schema<CommunityDocument>(
  {
    author_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    author: { type: String, required: true },
    admin_ids: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User",
      },
    ],
    name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    total_posts: { type: Number, default: 0 },
    total_followers: { type: Number, default: 0 },
    tags: [{ type: TagSchema }],
    rules: { type: String, required: true },
  },
  { timestamps: true }
);

export const CommunityModel: mongoose.Model<CommunityDocument> =
  mongoose.models.Community ||
  model<CommunityDocument>("Community", CommunitySchema);
