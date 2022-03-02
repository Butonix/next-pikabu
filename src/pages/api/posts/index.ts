import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@utils/dbConnect";
import { ResponseFuncs } from "@shared/types";

import PostController from "@src/server/controllers/PostController";

connect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    GET: PostController.getAll,
    POST: PostController.create,
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
