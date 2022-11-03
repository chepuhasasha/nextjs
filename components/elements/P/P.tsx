import styles from "./P.module.sass";
import type { IPProps } from "./P.props";
import cn from "classnames";

export const P = ({ size = "m", children, ...props }: IPProps): JSX.Element => {
  return (
    <p className={cn(styles.p, styles[size])} {...props}>
      {children}
    </p>
  );
};
