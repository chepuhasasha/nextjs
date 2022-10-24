import connectMongo from "../../utils/mongoose";
import { Brands } from "../../models/brands";

export default async function handler(req, res) {
  await connectMongo();
  switch (req.method) {
    case "PUT":
      try {
        await Brands.create(req.body)
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
        await Brands.findOneAndUpdate(req.body.condition, req.body.data)
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
        await Brands.findOneAndDelete(req.body)
          .then((result) => {
            console.log(result);
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
        await Brands.find(req.body)
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
