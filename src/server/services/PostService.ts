import { PostModel } from "@src/server/models/post.model";
import { CommunityModel } from "@src/server/models/community.model";

import { Post, PostInput } from "@shared/types";
import { PostDocument, TagDocument } from "@shared/types/documents";
import mongoose from "mongoose";

class PostService {
  async create(post: PostInput, user: { author_id: string; author: string }) {
    const { summary, title, community_id, tags } = post;

    const tagDocs = new mongoose.Types.DocumentArray<TagDocument>(tags);

    const newPost: PostDocument = {
      author_id: new mongoose.Types.ObjectId(user.author_id),
      author: user.author,
      title,
      summary,
      tags: tagDocs,
      community_id: community_id
        ? new mongoose.Types.ObjectId(community_id)
        : undefined,
    };
    if (community_id) {
      await CommunityModel.findByIdAndUpdate(
        community_id,
        {
          $inc: { total_posts: 1 },
        },
        { timestamps: false }
      );
    }
    const createdPost = await PostModel.create(newPost);
    // console.log(createdPost);
    return createdPost;
  }
  async getAll() {
    const posts = await PostModel.find();
    return posts;
  }

  async getOne(id: string) {
    const post = await PostModel.findById(id);
    return post;
  }

  async getAllUserPostsById(id: string) {
    const posts = await PostModel.find({ author_id: id });
    return posts;
  }
  async getAllUserPostsByName(author: string) {
    const posts = await PostModel.find({ author: author });
    return posts;
  }

  async getAllCommunityPosts(id: string) {
    const posts = await PostModel.find({ community_id: id });
    return posts;
  }

  async update(post: Post) {
    const updatedPost = await PostModel.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id: string) {
    const post = await PostModel.findByIdAndDelete(id);
    return post;
  }
  async incrementCommentCounter(id: string) {
    const post = await PostModel.findByIdAndUpdate(
      id,
      { $inc: { total_comments: 1 } },
      { timestamps: false }
    );
    return post;
  }
  async decrementCommentCounter(id: string) {
    const post = await PostModel.findByIdAndUpdate(
      id,
      { $inc: { total_comments: -1 } },
      { timestamps: false }
    );
    return post;
  }
}

export default new PostService();
