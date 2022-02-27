import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@utils/dbConnect";
import { ResponseFuncs } from "@shared/types";

import UserController from "@src/server/controllers/UserController";

connect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    GET: UserController.getOneById,
  };

  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
