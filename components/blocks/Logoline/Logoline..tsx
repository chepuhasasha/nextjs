import { CSSProperties } from "react";
import styles from "./Logoline.module.sass";
import type { ILogoLineProps } from "./Logoline.props";

export const Logoline = ({ area, ...props }: ILogoLineProps): JSX.Element => {
  const style: CSSProperties = {
    gridArea: area ? area : "none",
  };
  return (
    <div className={styles.logoline} {...props} style={style}>
      <img src="/logoline.svg" alt="logo" />
    </div>
  );
};
