import styles from "./Grid.module.sass";
import type { IGridProps } from "./Grid.props";
import cn from "classnames";

export const Grid = ({
  children,
  cols,
  rows,
  area='none',
  ...props
}: IGridProps): JSX.Element => {
  return (
    <div
      className={styles.grid}
      {...props}
      style={{ gridTemplateRows: rows, gridTemplateColumns: cols, gridArea: area }}
    >
      {children}
    </div>
  );
};
