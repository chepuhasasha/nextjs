import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IGridProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  children: ReactNode,
  cols: string
  rows: string
  area?: string
}