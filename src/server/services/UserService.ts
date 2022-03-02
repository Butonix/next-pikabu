import { UserDocument } from "@shared/types/documents";
import mongoose from "mongoose";
import { CommunityModel } from "../models/community.model";
import { UserModel } from "../models/user.model";

class UserService {
  async create(user: UserDocument) {
    const createdUser = await UserModel.create(user);
    return createdUser;
  }

  async findByEmail(email: string) {
    const foundUser = await UserModel.findOne({ email });
    return foundUser;
  }
  async getOneById(id: string) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const user = await UserModel.findById(id);
    return user;
  }
  async getOneByName(name: string) {
    if (!name) {
      throw new Error("не указан name");
    }
    const user = await UserModel.findOne({ name });
    return user;
  }
  async followCommunity(user_id: string, community_id: string) {
    const user = await UserModel.findById(user_id);
    const alreadyFollowing = user?.followed_community_ids?.includes(
      new mongoose.Types.ObjectId(community_id)
    );
    console.log(user?.followed_community_ids);
    if (alreadyFollowing) return null;
    await UserModel.findByIdAndUpdate(
      user_id,
      {
        $push: {
          followed_community_ids: new mongoose.Types.ObjectId(community_id),
        },
      },
      { timestamps: false }
    );
    await CommunityModel.findByIdAndUpdate(
      community_id,
      { $inc: { total_followers: 1 } },
      { timestamps: false }
    );
    return "followed community successfully";
  }
  async unfollowCommunity(user_id: string, community_id: string) {
    const user = await UserModel.findById(user_id);
    const alreadyFollowing = user?.followed_community_ids?.includes(
      new mongoose.Types.ObjectId(community_id)
    );
    if (!alreadyFollowing) return null;
    await UserModel.findByIdAndUpdate(user_id, {
      $pull: {
        followed_community_ids: new mongoose.Types.ObjectId(community_id),
      },
    });
    await CommunityModel.findByIdAndUpdate(
      community_id,
      { $inc: { total_followers: -1 } },
      { timestamps: false }
    );

    return "unfollowed community successfully";
  }
  async followUser(user_id: string, user_to_follow_id: string) {
    const user = await UserModel.findById(user_id);
    const alreadyFollowing = user?.followed_people_ids?.includes(
      new mongoose.Types.ObjectId(user_to_follow_id)
    );
    if (alreadyFollowing) return null;
    await UserModel.findByIdAndUpdate(
      user_id,
      {
        $push: {
          followed_people_ids: new mongoose.Types.ObjectId(user_to_follow_id),
        },
      },
      { timestamps: false }
    );
    await UserModel.findByIdAndUpdate(
      user_to_follow_id,
      { $inc: { follower_count: 1 } },
      { timestamps: false }
    );
    return "followed user successfully";
  }
  async unfollowUser(user_id: string, user_to_unfollow_id: string) {
    const user = await UserModel.findById(user_id);
    const alreadyFollowing = user?.followed_community_ids?.includes(
      new mongoose.Types.ObjectId(user_to_unfollow_id)
    );
    if (!alreadyFollowing) return null;
    await UserModel.findByIdAndUpdate(
      user_id,
      {
        $pull: {
          followed_people_ids: new mongoose.Types.ObjectId(user_to_unfollow_id),
        },
      },
      { timestamps: false }
    );
    await UserModel.findByIdAndUpdate(
      user_to_unfollow_id,
      { $inc: { follower_count: -1 } },
      { timestamps: false }
    );

    return "unfollowed user successfully";
  }
}

export default new UserService();
