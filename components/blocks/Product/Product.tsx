import Router from "next/router";
import { API } from "../../../utils/api";
import { Button, H3, P } from "../../elements";
import { Block } from "../../wrappers";
import styles from "./Product.module.sass";
import type { IProductProps } from "./Product.props";

export const ProductCard = ({
  product,
  ...props
}: IProductProps): JSX.Element => {
  return (
    <div className={styles.product} {...props}>
      <P>{JSON.stringify(product, null, 2)}</P>
    </div>
  );
};
