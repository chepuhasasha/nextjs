import styles from "./Select.module.sass";
import { ISelectProps } from "./Select.props";
import cn from "classnames";
import { useRef } from "react";

export const Select = ({
  register,
  name,
  label,
  error,
  options,
  ...props
}: ISelectProps) => {
  const select = useRef<HTMLSelectElement | null>(null);
  return (
    <div
      className={cn(styles.select, {
        [styles.error]: Boolean(error),
        [styles.primary]: true,
      })}
      onClick={() => {
        select.current?.focus();
      }}
    >
      <label htmlFor={name}>
        {label}
        {error && `: ${error}`}
      </label>
      <select
        name={name}
        ref={(e) => {
          register(e);
          select.current = e;
        }}
        {...props}
      >
        {options.map((o) => (
          <option key={o.name} value={o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
};
