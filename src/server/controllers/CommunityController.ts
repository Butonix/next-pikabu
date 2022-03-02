import { NextApiRequest, NextApiResponse } from "next";
import CommunityService from "../services/CommunityService";

import { getToken } from "next-auth/jwt";
import { CommunityInput } from "@shared/types";

const secret = process.env.SECRET;

class CommunityController {
  async getAll(req: NextApiRequest, res: NextApiResponse) {
    try {
      const communities = await CommunityService.getAll();
      res.json(communities);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getOne(req: NextApiRequest, res: NextApiResponse) {
    try {
      const community = await CommunityService.getOne(req.query.id as string);
      res.json(community);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret });
    if (!token) {
      // Not Signed in
      res.status(401).json("Not Authorized");
      return;
    }
    try {
      const userInput: CommunityInput = req.body;
      const user = { author: token.name as string, author_id: token.id };
      const createdCommunity = await CommunityService.create(userInput, user);
      res.json(createdCommunity);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new CommunityController();
