import styles from './Textarea.module.sass';
import { ITextareaProps } from "./Textarea.props";
import cn from 'classnames';
import { useRef } from 'react';

export const Textarea = ({ register, name, label, error, ...props }: ITextareaProps) => {
  const textarea = useRef<HTMLTextAreaElement | null>(null)
  return (
    <div className={cn(styles.input, {
        [styles.error]: Boolean(error),
        [styles.primary]: true
      })}
      onClick={() => {
        textarea.current?.focus()
      }}
    >
      <label htmlFor={name}>
        {label}
        {error && `: ${error}`}
      </label>
      <textarea 
        res
        name={name}
        placeholder="Jane"
        ref={(e) => {
          register(e)
          textarea.current = e
        }}
        {...props}
        />
    </div>
  );
};
