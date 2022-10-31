import { useEffect, useRef } from "react";
import { Mask } from "../../../utils/pixi/mask";
import styles from "./Mask.module.sass";
import type { IMaskProps } from "./Mask.props";

export const MaskBlock = ({
  mode,
  url = "/img.jpg",
  ...props
}: IMaskProps): JSX.Element => {
  const mask = useRef<HTMLDivElement | null>(null);
  let pixi: Mask | null = null;
  useEffect(() => {
    if (mask.current && !pixi) {
      pixi = new Mask(mask.current, mode, url);
    }
  });
  return <div className={styles.mask} {...props} ref={mask}></div>;
};
