import styles from "./Input.module.sass";
import { IInputProps } from "./Input.props";
import cn from "classnames";
import { useRef } from "react";

export const Input = ({
  register,
  name,
  label,
  error,
  ...props
}: IInputProps) => {
  const input = useRef<HTMLInputElement | null>(null);
  return (
    <div
      className={cn(styles.input, {
        [styles.error]: Boolean(error),
        [styles.primary]: true,
      })}
      onClick={() => {
        input.current?.focus();
      }}
    >
      <label htmlFor={name}>
        {label}
        {error && `: ${error}`}
      </label>
      <input
        name={name}
        placeholder="Jane"
        ref={(e) => {
          register(e);
          input.current = e;
        }}
        {...props}
      />
    </div>
  );
};
