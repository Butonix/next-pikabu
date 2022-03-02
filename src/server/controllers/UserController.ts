import { NextApiRequest, NextApiResponse } from "next";

import { hashPassword } from "@shared/utils/auth";
import UserService from "../services/UserService";
import { getToken } from "next-auth/jwt";

const secret = process.env.SECRET;

class UserController {
  async create(req: NextApiRequest, res: NextApiResponse) {
    try {
      const { email, password, name } = req.body;

      if (!email || !email.includes("@") || !password) {
        res.status(422).json({ message: "Invalid Data" });
        return;
      }

      const checkExistingEmail = await UserService.findByEmail(email);
      const checkExistingName = await UserService.findByEmail(name);

      if (checkExistingEmail) {
        res.status(422).json({ message: "email уже используется в системе" });
        return;
      }
      if (checkExistingName) {
        res.status(422).json({ message: "логин уже занят" });
        return;
      }
      const hashedPassword = hashPassword(password);

      const status = await UserService.create({
        email,
        name,
        password: await hashedPassword,
      });

      res.status(201).json({ message: "User created", ...status });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOneById(req: NextApiRequest, res: NextApiResponse) {
    const id = req.query.id as string;

    try {
      const user = await UserService.getOneById(id);
      res.json({ message: "user found" });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getOneByName(req: NextApiRequest, res: NextApiResponse) {
    const name = req.query.name as string;

    try {
      const user = await UserService.getOneByName(name);

      if (!user) res.status(404).json("Not found");

      res.json({ ...user?.toObject(), password: undefined });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async followCommunity(req: NextApiRequest, res: NextApiResponse) {
    const communityId = req.query.communityId as string;
    const token = await getToken({ req, secret });
    if (token === null) {
      res.status(401).json("Not Authorized");
      return;
    }
    const userId = token.id;
    try {
      await UserService.followCommunity(userId, communityId);

      res.json(`now following community: id: ${communityId}`);
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new UserController();
