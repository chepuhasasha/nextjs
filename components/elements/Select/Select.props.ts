import { DetailedHTMLProps, HTMLAttributes } from "react";
import { RefCallBack } from "react-hook-form";

export interface ISelectProps extends DetailedHTMLProps<HTMLAttributes<HTMLSelectElement>, HTMLSelectElement>{
  register: RefCallBack
  label: string
  name: string
  error?: string
  type?: string,
  options: {name: string, value: string}[]
}