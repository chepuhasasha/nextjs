import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IHtagProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
  children: ReactNode
}