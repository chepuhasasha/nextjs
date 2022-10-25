import { Brands } from "../../models/brands";
import BaseController from "../../utils/controllers/base.controller";

export default async function handler(req, res) {
  await BaseController(Brands, req, res);
}
