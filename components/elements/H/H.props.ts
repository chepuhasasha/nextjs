import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IHProps extends DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>{
  children: ReactNode
}