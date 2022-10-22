import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";

export interface IButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLButtonElement>, HTMLButtonElement>{
  children: ReactNode,
  appearance?: 'primary' | 'ghost'
}