import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IBlockProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  children: ReactNode,
  area?: string,
  justify?: CSSStyleDeclaration['justifyContent']
  align?: CSSStyleDeclaration['alignItems']
  col?: boolean,
  padding?: string
  gap?: number
}