import styles from "./Block.module.sass";
import type { IBlockProps } from "./Block.props";
import cn from "classnames";

export const Block = ({
  children,
  area,
  ...props
}: IBlockProps): JSX.Element => {
  return (
    <div
      className={styles.block}
      {...props}
      style={{ gridArea: area ? area : "none" }}
    >
      {children}
    </div>
  );
};
