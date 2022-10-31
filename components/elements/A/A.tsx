import styles from './A.module.sass';
import type { IAProps } from "./A.props";
import Link from 'next/link';

export const A = ({ name, path, ...props}: IAProps, ref): JSX.Element => {
  return (
    <Link href={path} passHref>
      <a className={styles.a} {...props}>{ name }</a>
    </Link>
  );
};