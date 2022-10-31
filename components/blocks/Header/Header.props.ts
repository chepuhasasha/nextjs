import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IHeaderProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  links?: { name: string, path: string }[]
}