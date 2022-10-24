import styles from './Input.module.sass';
import type { IInputProps } from "./Input.props";
import cn from 'classnames';
import { useEffect, useRef } from 'react';

export const Input = ({appearance='primary', model, ...props}: IInputProps): JSX.Element => {
  return (
    <div className={cn(styles.input, {
      [styles.primary]: appearance == 'primary',
      [styles.ghost]: appearance == 'ghost'
    })}>
      <input
        {...props}
      />
    </div>
    );
};
