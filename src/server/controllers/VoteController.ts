import { VotePayload } from "@shared/types";
import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import VoteService from "../services/VoteService";

const secret = process.env.SECRET;

class VoteController {
  async voteComment(req: NextApiRequest, res: NextApiResponse) {
    const commentId = req.query.commentId as string;
    const token = await getToken({ req, secret });
    const { vote }: VotePayload & any = req.body;
    console.log(token);
    if (token === null) {
      res.status(401).json("Not Authorized");
      return;
    }
    const userId = token.id as string;
    try {
      const response = await VoteService.voteComment(commentId, userId, vote);

      res.json(response);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async votePost(req: NextApiRequest, res: NextApiResponse) {
    const postId = req.query.postId as string;
    const token = await getToken({ req, secret });
    const { vote }: VotePayload & any = req.body;
    if (token === null) {
      res.status(401).json("Not Authorized");
      return;
    }
    const userId = token.id as string;
    try {
      const response = await VoteService.votePost(postId, userId, vote);
      res.json(response);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new VoteController();
