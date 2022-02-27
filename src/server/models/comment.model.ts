import { CommentDocument } from "@shared/types/documents";
import mongoose, { Schema, model } from "mongoose";

const CommentSchema = new Schema<CommentDocument>(
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
    post_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    body: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      default: 0,
    },
    children_count: { type: Number, default: 0 },
    parent_comment_id: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Comment",
    },
    root_comment_id: {
      type: Schema.Types.ObjectId,
      required: false,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

export const CommentModel: mongoose.Model<CommentDocument> =
  mongoose.models.Comment || model<CommentDocument>("Comment", CommentSchema);
