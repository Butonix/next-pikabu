import { TagDocument } from "@shared/types/documents";
import mongoose, { Schema, model } from "mongoose";

export const TagSchema = new Schema<TagDocument>({
  name: { type: String, required: true },
});

export const TagModel: mongoose.Model<TagDocument> =
  mongoose.models.Tag || model<TagDocument>("Tag", TagSchema);
