import styles from './Brand.module.sass';
import type { IBrandProps } from "./Brand.props";

export const BrandItemM = ({brand, ...props}: IBrandProps): JSX.Element => {
  return (
    <div className={styles.brand_m} {...props}>
      <pre>{JSON.stringify(brand, null, 2)}</pre>
    </div>
  );
};
