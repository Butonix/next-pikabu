import { CommentModel } from "../models/comment.model";
import { CommentDocument } from "@shared/types/documents";

class CommentService {
  async getPostComments(id: string) {
    const comments = await CommentModel.find({
      post_id: id,
      parent_comment_id: undefined,
    }).lean();
    return comments;
  }
  async getForComment(id: string) {
    /** get flat thread of comments for root comment */
    const comments = await CommentModel.find({
      $or: [{ root_comment_id: id }, { _id: id }],
    }).lean();
    return comments;
  }
  async create(comment: CommentDocument) {
    const createdComment = await CommentModel.create(comment);
    return createdComment;
  }

  async incrementChildCounter(id: string) {
    const incrementedCounterDoc = await CommentModel.findByIdAndUpdate(
      id,
      { $inc: { children_count: 1 } },
      { timestamps: false }
    );
    return incrementedCounterDoc;
  }
  async decrementChildCounter(id: string) {
    const decrementedCounterDoc = await CommentModel.findByIdAndUpdate(
      id,
      { $inc: { children_count: -1 } },
      { timestamps: false }
    );
    return decrementedCounterDoc;
  }
}

export default new CommentService();
