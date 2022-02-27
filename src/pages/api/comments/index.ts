import { ResponseFuncs } from "@shared/types";
import CommentController from "@src/server/controllers/CommentController";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    POST: CommentController.create,
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
