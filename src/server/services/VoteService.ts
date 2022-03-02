import mongoose from "mongoose";
import { CommentModel } from "../models/comment.model";
import { PostModel } from "../models/post.model";
import { UserModel } from "../models/user.model";

import {
  UserDocument,
  VoteCommentDocument,
  VotePostDocument,
} from "@shared/types/documents";

class VoteService {
  async votePost(post_id: string, user_id: string, vote: 1 | -1) {
    const user = await UserModel.findById(user_id).lean();
    const post = await PostModel.findById(post_id).lean();
    if (post?.author_id.toString() === user_id)
      throw new Error("Нельзя оценивать свои посты");
    const alreadyVoted = user?.rated_posts?.find(
      (el) => el.post_id.toString() === post_id
    );
    if (alreadyVoted) {
      if (alreadyVoted.value === 1 && vote === 1)
        throw new Error("Нельзя два раза ставить положительную оценку");
      if (alreadyVoted.value === -1 && vote === -1)
        throw new Error("Нельзя два раза ставить отрицательную оценку");

      await PostModel.findByIdAndUpdate(post_id, {
        $inc: {
          rating: vote,
          ...(vote === 1
            ? { downvotes: vote }
            : vote === -1
            ? { upvotes: vote }
            : {}),
        },
      });
      await UserModel.findByIdAndUpdate(user_id, {
        $pull: {
          rated_posts: { post_id: post_id },
        },
      });
      return "post was voted successfully";
    } else {
      await PostModel.findByIdAndUpdate(post_id, {
        $inc: {
          rating: vote,
          ...(vote === 1
            ? { upvotes: vote }
            : vote === -1
            ? { downvotes: vote }
            : {}),
        },
      });
      const uservote: VotePostDocument = {
        post_id: new mongoose.Types.ObjectId(post_id),
        value: vote,
      };
      await UserModel.findByIdAndUpdate(user_id, {
        $push: {
          rated_posts: uservote,
        },
      });
      return "post was voted successfully";
    }
  }
  async voteComment(comment_id: string, user_id: string, vote: 1 | -1) {
    const user = await UserModel.findById(user_id).lean();
    const comment = await CommentModel.findById(comment_id).lean();
    if (comment?.author_id.toString() === user_id)
      throw new Error("Нельзя оценивать свои комментарии");
    const alreadyVoted = user?.rated_comments?.find(
      (el) => el.comment_id?.toString() === comment_id
    );
    const author_id = comment?.author_id;
    if (alreadyVoted) {
      if (alreadyVoted.value === 1 && vote === 1)
        throw new Error("Нельзя два раза ставить положительную оценку");
      if (alreadyVoted.value === -1 && vote === -1)
        throw new Error("Нельзя два раза ставить отрицательную оценку");

      await CommentModel.findByIdAndUpdate(
        comment_id,
        {
          $inc: {
            rating: vote,
            ...(vote === 1
              ? { downvotes: vote }
              : vote === -1
              ? { upvotes: vote }
              : {}),
          },
        },
        { timestamps: false }
      );
      await UserModel.findByIdAndUpdate(
        user_id,
        {
          $pull: {
            rated_comments: { comment_id: comment_id },
          },
        },
        { timestamps: false }
      );
      await UserModel.findByIdAndUpdate(
        author_id,
        {
          $inc: { rating: vote },
        },
        { timestamps: false }
      );
      return "comment was voted successfully";
    } else {
      await CommentModel.findByIdAndUpdate(
        comment_id,
        {
          $inc: {
            rating: vote,
            ...(vote === 1
              ? { upvotes: vote }
              : vote === -1
              ? { downvotes: vote }
              : {}),
          },
        },
        { timestamps: false }
      );
      const uservote: VoteCommentDocument = {
        comment_id: new mongoose.Types.ObjectId(comment_id),
        value: vote,
      };
      await UserModel.findByIdAndUpdate(
        user_id,
        {
          $push: {
            rated_comments: uservote,
          },
        },
        { timestamps: false }
      );
      await UserModel.findByIdAndUpdate(
        author_id,
        { $inc: { rating: vote } },
        { timestamps: false }
      );
      return "comment was voted successfully";
    }
  }
}
export default new VoteService();
