import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IMapObjectProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  changeMap: (data: Record<string, string>) => void,
  label?: string,
}