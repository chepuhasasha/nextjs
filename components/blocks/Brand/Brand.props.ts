import { DetailedHTMLProps, HTMLAttributes } from "react";
import { IBrandDB } from "../../../models/brands";

export interface IBrandProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  brand: IBrandDB,
}