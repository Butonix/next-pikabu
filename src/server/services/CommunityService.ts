import { CommunityModel } from "@src/server/models/community.model";

import { CommunityDocument, TagDocument } from "@shared/types/documents";
import { CommunityInput } from "@shared/types";
import mongoose from "mongoose";

class CommunityService {
  async create(
    userInput: CommunityInput,
    user: { author_id: string; author: string }
  ) {
    const { name, summary, rules, tags } = userInput;
    const tagDocs = new mongoose.Types.DocumentArray<TagDocument>(tags);

    const admin_ids = new mongoose.Types.DocumentArray<mongoose.Types.ObjectId>(
      [new mongoose.Types.ObjectId(user.author_id)]
    );
    const community: CommunityDocument = {
      name,
      summary,
      rules,
      tags: tagDocs,
      admin_ids,
      author_id: new mongoose.Types.ObjectId(user.author_id),
      author: user.author,
    };
    // console.log(tags, tagDocs);

    const createdCommunity = await CommunityModel.create(community);
    return createdCommunity;
  }

  async getAll() {
    const communities = await CommunityModel.find();
    return communities;
  }

  async getOne(id: string) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const community = await CommunityModel.findById(id);
    return community;
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const community = await CommunityModel.findByIdAndDelete(id);
    return community;
  }
}

export default new CommunityService();
