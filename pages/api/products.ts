import connectMongo from "../../utils/mongoose";
import { Products } from "../../models/products";
import BaseController from "../../utils/base.controller";

export default async function handler(req, res) {
  await connectMongo();
  await BaseController(Products, req, res);
}
