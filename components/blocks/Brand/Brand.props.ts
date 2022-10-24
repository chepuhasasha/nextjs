import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IBrand } from "../../../models/brands";

export interface IBrandProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  brand: IBrand | null,
  size?: 's' | 'm' | 'l'
}