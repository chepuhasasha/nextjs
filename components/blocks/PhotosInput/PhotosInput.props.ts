import { DetailedHTMLProps, HTMLAttributes } from "react";

export interface IPhotosInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  onFileLoad: (path: string[]) => void,
  label?: string,
  text?: string,
  multy?: boolean
}