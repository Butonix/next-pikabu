import { NextApiRequest, NextApiResponse } from "next";
import { connect } from "@utils/dbConnect";
import { ResponseFuncs } from "@shared/types";

import { TagModel } from "@src/server/models/tag.model";

connect();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const method: keyof ResponseFuncs = req.method as keyof ResponseFuncs;

  const handleCase: ResponseFuncs = {
    GET: async () => {
      try {
        const tags = await TagModel.find();
        res.json(tags);
      } catch (e) {
        res.status(500).json(e);
      }
    },
    POST: async () => {
      try {
        const tag = await TagModel.create({
          name: req.body.name,
        });
        res.json(tag);
      } catch (e) {
        res.status(500).json(e);
      }
    },
  };
  const response = handleCase[method];
  if (response) response(req, res);
  else res.status(400).json({ error: "No Response for This Request" });
};

export default handler;
