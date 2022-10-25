import { Model } from "mongoose";
import { NextApiRequest, NextApiResponse } from "next";

export default async function BaseController(collection: Model<any>, req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "PUT":
      try {
        await collection.create(req.body)
          .then((result) => {
            res.status(201).json(result);
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      } catch (err) {
        res.status(400).json({ err });
      }
      break;

    case "PATCH":
      if (!req.body.condition || !req.body.data) {
        res.status(400).json({ err: "id parameter not specified" });
        return;
      }
      try {
        await collection.findOneAndUpdate(req.body.condition, req.body.data)
          .then((result) => {
            res.status(202).json({ ...result._doc, ...req.body });
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      } catch (err) {
        res.status(400).json({ err });
      }
      break;

    case "DELETE":
      try {
        await collection.findOneAndDelete(req.body)
          .then((result) => {
            res.status(result ? 202 : 404).json(result);
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      } catch (err) {
        res.status(400).json({ err });
      }
      break;

    case "POST":
      try {
        await collection.find(req.body)
          .then((result) => {
            res.status(200).json(result);
          })
          .catch((err) => {
            res.status(400).json({ err });
          });
      } catch (err) {
        res.status(400).json({ err });
      }
      break;

    default:
      res.json({ method: req.method, query: req.query });
      break;
  }
}