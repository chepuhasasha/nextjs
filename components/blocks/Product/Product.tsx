import { P } from "../../elements";
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
