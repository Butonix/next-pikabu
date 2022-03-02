import { NextApiRequest, NextApiResponse } from "next";

import { ResponseFuncs } from "@shared/types";
import FollowController from "@src/server/controllers/FollowController";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    POST: FollowController.followUser,
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
