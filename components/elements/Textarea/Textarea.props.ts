import { RefCallBack } from "react-hook-form";

export interface ITextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>{
  appearance?: 'primary' | 'ghost'
  register: RefCallBack
  label: string
  name: string
  error?: string
}