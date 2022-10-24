import { DBID } from "./id.type";
import { Local } from "./local.interface";
import { ProductDB } from "./product.interface";

export interface ProductsList {
  title: Local
  description: Local
  products: ProductDB['_id'][],
  baner: string
}

export interface ProductsList {
  _id: DBID
}