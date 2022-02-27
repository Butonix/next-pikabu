import { PostDocument } from "@shared/types/documents";
import mongoose, { Schema, model } from "mongoose";

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
      required: true,
    },

    total_comments: {
      type: Number,
      required: true,
    },
    total_views: {
      type: Number,
      required: true,
    },
    tag_ids: [{ type: Schema.Types.ObjectId, ref: "Tag", required: false }],
    community_id: { type: Schema.Types.ObjectId, ref: "Community" },
  },
  { timestamps: true }
);

export const PostModel: mongoose.Model<PostDocument> =
  mongoose.models.Post || model<PostDocument>("Post", PostSchema);
