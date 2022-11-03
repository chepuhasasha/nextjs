import { RefCallBack } from "react-hook-form";

export interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement>{
  appearance?: 'primary' | 'ghost'
  register: RefCallBack
  label: string
  name: string
  error?: string
  type?: string
}