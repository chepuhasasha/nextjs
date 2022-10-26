import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RefCallBack } from "react-hook-form";

export interface IFileImgInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  onFileSelect: (file: any) => void,
  text?: string
}