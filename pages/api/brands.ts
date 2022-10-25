import connectMongo from "../../utils/mongoose";
import { Brands } from "../../models/brands";
import BaseController from "../../utils/base.controller";

export default async function handler(req, res) {
  await connectMongo();
  await BaseController(Brands, req, res);
}
