import styles from "./Block.module.sass";
import type { IBlockProps } from "./Block.props";
import cn from "classnames";
import { CSSProperties } from "react";

export const Block = ({
  children,
  area,
  justify,
  align,
  col = true,
  padding = '20px',
  gap = 10,
  ...props
}: IBlockProps): JSX.Element => {
  const style: CSSProperties = {
    justifyContent: justify ? justify : "none",
    alignItems: align ? align : "none",
    flexDirection: col ? "column" : "row",
    gridArea: area ? area : "none",
    padding: padding,
    gap: gap
  };
  return (
    <div className={styles.block} {...props} style={style}>
      {children}
    </div>
  );
};
