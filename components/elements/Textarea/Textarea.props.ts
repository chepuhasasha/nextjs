import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RefCallBack } from "react-hook-form";

export interface ITextareaProps extends DetailedHTMLProps<HTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement>{
  appearance?: 'primary' | 'ghost'
  register: RefCallBack
  label: string
  name: string
  error?: string
  rows: string
}