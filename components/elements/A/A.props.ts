import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IAProps extends DetailedHTMLProps<HTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>{
  children: ReactNode,
  name: string
  path: string
}