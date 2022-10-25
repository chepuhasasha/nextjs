import BaseController from "../../utils/controllers/base.controller";
import { ProductsLists } from "../../models/productsList";

export default async function handler(req, res) {
  await BaseController(ProductsLists, req, res);
}
