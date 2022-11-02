import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IProductDB } from "../../../models/products";

export interface IProductProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  product: IProductDB,
}