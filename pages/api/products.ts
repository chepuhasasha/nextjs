import { Products } from "../../models/products";
import BaseController from "../../utils/controllers/base.controller";

export default async function handler(req, res) {
  await BaseController(Products, req, res);
}
