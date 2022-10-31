import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IAdminLayoutProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>{
  children: ReactNode,
  title: string
}