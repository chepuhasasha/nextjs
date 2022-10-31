import Router from "next/router";
import styles from "./Header.module.sass";
import { IHeaderProps } from "./Header.props";
import { A } from "../../elements";

export const Header = ({ links = [], ...props }: IHeaderProps): JSX.Element => {
  return (
    <header className={styles.header} {...props}>
      <img src="/logo_min.svg" alt="logo" onClick={() => Router.push('/')} />
      <div className={styles.header_links}>
        {links.map((link) => (
          <A key={link.path} name={link.name} path={link.path}>{link.name}</A>
        ))}
      </div>
    </header>
  );
};
