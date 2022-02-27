import { PostModel } from "@src/server/models/post.model";
import { Post } from "@shared/types";
import { PostDocument } from "@shared/types/documents";

class PostService {
  async create(post: PostDocument) {
    const createdPost = await PostModel.create(post);
    return createdPost;
  }

  async getAll() {
    const posts = await PostModel.find();
    return posts;
  }

  async getOne(id: string) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const post = await PostModel.findById(id);
    return post;
  }

  async update(post: Post) {
    if (!post._id) {
      throw new Error("не указан ID");
    }
    const updatedPost = await PostModel.findByIdAndUpdate(post._id, post, {
      new: true,
    });
    return updatedPost;
  }

  async delete(id: string) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const post = await PostModel.findByIdAndDelete(id);
    return post;
  }
}

export default new PostService();
