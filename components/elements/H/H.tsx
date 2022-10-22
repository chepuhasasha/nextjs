import styles from './H.module.sass';
import type { IHProps } from "./H.props";

export const H1 = ({children, ...props}: IHProps): JSX.Element => {
  return (<h1 className={styles.h1} {...props}>{children}</h1>);
};
export const H2 = ({children, ...props}: IHProps): JSX.Element => {
  return (<h2 className={styles.h2} {...props}>{children}</h2>);
};
export const H3 = ({children, ...props}: IHProps): JSX.Element => {
  return (<h3 className={styles.h3} {...props}>{children}</h3>);
};