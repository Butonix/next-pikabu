import { NextApiRequest, NextApiResponse } from "next";
import VoteController from "@src/server/controllers/VoteController";
import { ResponseFuncs } from "@shared/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    POST: VoteController.votePost,
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
