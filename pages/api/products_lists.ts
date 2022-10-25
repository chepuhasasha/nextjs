import connectMongo from "../../utils/mongoose";
import BaseController from "../../utils/base.controller";
import { ProductsLists } from "../../models/productsList";

export default async function handler(req, res) {
  await connectMongo();
  await BaseController(ProductsLists, req, res);
}
