import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IFormProps extends DetailedHTMLProps<HTMLAttributes<HTMLFormElement>, HTMLFormElement>{
  children: ReactNode,
  title?: string,
  description?: string
}