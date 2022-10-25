import { DetailedHTMLProps, HTMLAttributes, MutableRefObject } from "react";

export interface IInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  appearance?: 'primary' | 'ghost'
}