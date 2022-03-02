import { NextApiRequest, NextApiResponse } from "next";
import PostService from "../services/PostService";

import { getToken } from "next-auth/jwt";

import { PostInput, VotePayload } from "@shared/types";

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
    if (!token) {
      res.status(401).json("Not Authorized");
      return;
    }
    try {
      const userInput: PostInput = req.body;
      const user = { author: token.name as string, author_id: token.id };
      const createdPost = await PostService.create(userInput, user);
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

  async getCommmunityPosts(req: NextApiRequest, res: NextApiResponse) {
    const communityId = req.query.communityId as string;
    try {
      const posts = await PostService.getAllCommunityPosts(communityId);
      res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getUserPostsById(req: NextApiRequest, res: NextApiResponse) {
    const userId = req.query.userId as string;
    try {
      const posts = await PostService.getAllUserPostsById(userId);
      res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
  async getUserPostsByName(req: NextApiRequest, res: NextApiResponse) {
    const username = req.query.username as string;
    try {
      const posts = await PostService.getAllUserPostsByName(username);
      res.json(posts);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new PostController();
