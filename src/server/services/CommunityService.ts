import { CommunityModel } from "@src/server/models/community.model";

import { CommunityDocument } from "@shared/types/documents";

class CommunityService {
  async create(community: CommunityDocument) {
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
