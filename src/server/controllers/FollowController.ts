import { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";

import UserService from "../services/UserService";
import { FollowPayload } from "@shared/types";

const secret = process.env.SECRET;

class FollowController {
  async followUser(req: NextApiRequest, res: NextApiResponse) {
    const userToFollowId = req.query.userId as string;
    const token = await getToken({ req, secret });
    const { value }: FollowPayload = req.body;
    if (!token) {
      // Not Signed in
      res.status(401).json("Not Authorized");
      return;
    }
    const userId = token.id;
    if (value === 1) {
      try {
        const response = await UserService.followUser(userId, userToFollowId);
        res.json(response);
      } catch (e) {
        res.status(500).json(e);
      }
    } else if (value === -1) {
      const userToUnFollowId = req.query.userId as string;
      try {
        const response = await UserService.unfollowUser(
          userId,
          userToUnFollowId
        );
        res.json(response);
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res.status(400).json("value must be either 1 or -1");
    }
  }

  async followCommunity(req: NextApiRequest, res: NextApiResponse) {
    const communityToFollowId = req.query.communityId as string;
    const token = await getToken({ req, secret });
    const { value }: FollowPayload = req.body;
    if (!token) {
      // Not Signed in
      res.status(401).json("Not Authorized");
      return;
    }
    const userId = token.id;
    if (value === 1) {
      try {
        const response = await UserService.followCommunity(
          userId,
          communityToFollowId
        );
        res.json(response);
      } catch (e) {
        res.status(500).json(e);
      }
    } else if (value === -1) {
      const communityToUnfollowId = req.query.communityId as string;
      try {
        const userId = token.id;
        const response = await UserService.unfollowCommunity(
          userId,
          communityToUnfollowId
        );
        res.json(response);
      } catch (e) {
        res.status(500).json(e);
      }
    } else {
      res.status(400).json("value must be either 1 or 2");
    }
  }
}

export default new FollowController();
