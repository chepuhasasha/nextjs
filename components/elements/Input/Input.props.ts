import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RefCallBack } from "react-hook-form";

export interface IInputProps extends DetailedHTMLProps<HTMLAttributes<HTMLInputElement>, HTMLInputElement>{
  appearance?: 'primary' | 'ghost'
  register: RefCallBack
  label: string
  name: string
  error?: string
  type?: string
}