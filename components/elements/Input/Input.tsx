import styles from './Input.module.sass';
import type { IInputProps } from "./Input.props";
import cn from 'classnames';

export const Input = ({appearance='primary', ...props}: IInputProps): JSX.Element => {
  return (
      <input
        {...props}
      />
    );
};
