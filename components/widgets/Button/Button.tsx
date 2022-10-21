import styles from './Button.module.sass';
import type { IButtonProps } from "./Button.props";
import cn from 'classnames';

export const Button = ({appearance='primary', children, ...props}: IButtonProps): JSX.Element => {
  return (
    <button 
      className={cn(styles.button, {
        [styles.primary]: appearance == 'primary',
        [styles.ghost]: appearance == 'ghost'
      })}
      {...props}
    >
      {children}
    </button>
    );
};
