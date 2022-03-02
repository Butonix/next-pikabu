import { PostDocument } from "@shared/types/documents";
import mongoose, { Schema, model, Model } from "mongoose";
import { TagSchema } from "./tag.model";

const PostSchema = new Schema<PostDocument>(
  {
    author_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    author: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },

    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    },

    total_comments: {
      type: Number,
      default: 0,
    },
    total_views: {
      type: Number,
      default: 0,
    },
    // tags: [TagSchema],
    tags: [{ type: TagSchema }],
    community_id: { type: Schema.Types.ObjectId, ref: "Community" },
    // upvoted_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
    // downvoted_by: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

export const PostModel: mongoose.Model<PostDocument> =
  mongoose.models.Post || model<PostDocument>("Post", PostSchema);
