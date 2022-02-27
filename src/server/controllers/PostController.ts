import { NextApiRequest, NextApiResponse } from "next";
import PostService from "../services/PostService";

import { getToken } from "next-auth/jwt";
import { PostDocument } from "@shared/types/documents";
import { PostInput } from "@shared/types";

import mongoose from "mongoose";
const secret = process.env.SECRET;

class PostController {
  async getAll(req: NextApiRequest, res: NextApiResponse) {
    try {
      const posts = await PostService.getAll();
      res.json(posts);
    } catch (e) {
      res.status(400).json(e);
    }
  }

  async getOne(req: NextApiRequest, res: NextApiResponse) {
    try {
      const post = await PostService.getOne(req.query.id as string);
      res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async create(req: NextApiRequest, res: NextApiResponse) {
    const token = await getToken({ req, secret });
    const { summary, title, community_id, tag_ids }: PostInput = req.body;
    const tagIdArr = tag_ids?.map((tag) => new mongoose.Types.ObjectId(tag));

    if (!token) {
      res.status(401).json("Not Authorized");
      return;
    }
    // Signed in
    // console.log("JSON Web Token start", token, "JSON Web Token end");
    try {
      const post: PostDocument = {
        author_id: new mongoose.Types.ObjectId(token.id),
        author: token.name as string,
        title,
        summary,
        rating: 0,
        total_comments: 0,
        total_views: 0,
        tag_ids: new mongoose.Types.Array(...tagIdArr),
        community_id: new mongoose.Types.ObjectId(community_id),
      };
      const createdPost = await PostService.create(post);
      res.json(createdPost);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async update(req: NextApiRequest, res: NextApiResponse) {
    try {
      const post = await PostService.update(req.body);
      res.json(post);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
