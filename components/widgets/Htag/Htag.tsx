import styles from './Htag.module.sass';
import type { IHtagProps } from "./Htag.props";

export const H1 = ({children, ...props}: IHtagProps): JSX.Element => {
  return (<h1 className={styles.h1} {...props}>{children}</h1>);
};
export const H2 = ({children, ...props}: IHtagProps): JSX.Element => {
  return (<h2 className={styles.h2} {...props}>{children}</h2>);
};
export const H3 = ({children, ...props}: IHtagProps): JSX.Element => {
  return (<h3 className={styles.h3} {...props}>{children}</h3>);
};