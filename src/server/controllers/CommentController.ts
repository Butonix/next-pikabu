import { CommentInput } from "@shared/types";
import { CommentDocument } from "@shared/types/documents";
import { createCommentTree } from "@shared/utils/createDataTree";
import mongoose from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import CommentService from "../services/CommentService";

const secret = process.env.SECRET;

class CommentController {
  async create(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret });
    const { body, post_id, parent_comment_id, root_comment_id }: CommentInput =
      req.body;
    console.log(req.body);
    if (token === null) {
      res.status(401).json("Not Authorized");
      return;
    }
    const author = token.name as string;

    // check if reply or root
    // if reply then update children counter on parent and/or root comments
    if (parent_comment_id && root_comment_id) {
      try {
        await CommentService.incrementChildCounter(root_comment_id);
        if (parent_comment_id !== root_comment_id) {
          await CommentService.incrementChildCounter(parent_comment_id);
        }
      } catch (error) {
        res.status(500).json("error updating child counter");
      }
    }

    try {
      const comment: CommentDocument = {
        author_id: new mongoose.Types.ObjectId(token.id),
        author,
        post_id: new mongoose.Types.ObjectId(post_id),
        body,
        rating: 0,
        parent_comment_id:
          parent_comment_id === undefined
            ? undefined
            : new mongoose.Types.ObjectId(parent_comment_id),
        root_comment_id:
          root_comment_id === undefined
            ? undefined
            : new mongoose.Types.ObjectId(root_comment_id),
      };
      const createdComment = await CommentService.create(comment);
      res.json(createdComment);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getForPost(req: NextApiRequest, res: NextApiResponse) {
    try {
      const comments = await CommentService.getPostComments(
        req.query.postId as string
      );
      res.json(comments);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getForComment(req: NextApiRequest, res: NextApiResponse) {
    try {
      const comments = await CommentService.getTreeOfComments(
        req.query.commentId as string
      );

      const tree = createCommentTree(comments);
      res.json(tree);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
export default new CommentController();
