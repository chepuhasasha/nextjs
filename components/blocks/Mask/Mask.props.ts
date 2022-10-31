import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IMaskProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  mode: number,
  url?: string
}