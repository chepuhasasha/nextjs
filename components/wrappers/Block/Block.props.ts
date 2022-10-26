import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  children: ReactNode,
  area?: string
}