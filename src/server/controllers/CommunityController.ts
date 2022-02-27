import { NextApiRequest, NextApiResponse } from "next";
import CommunityService from "../services/CommunityService";

import { getToken } from "next-auth/jwt";
import { CommunityDocument } from "@shared/types/documents";
import { CommunityInput } from "@shared/types";

import mongoose from "mongoose";
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
    const { name, summary, rules }: CommunityInput = req.body;
    if (token) {
      // Signed in
      // console.log("JSON Web Token start", token, "JSON Web Token end");
      try {
        const community: CommunityDocument = {
          name,
          summary,
          rules,
          admin_id: new mongoose.Types.ObjectId(token.id as string),
          total_posts: 0,
          total_users: 0,
        };
        const createdCommunity = await CommunityService.create(community);
        res.json(createdCommunity);
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      // Not Signed in
      res.status(401).json("Not Authorized");
    }
    const userData = { ...token };
  }
}

export default new CommunityController();
