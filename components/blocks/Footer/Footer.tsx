import { H3, P } from "../../elements";
import styles from "./Footer.module.sass";
import { IFooterProps } from "./Footer.props";

export const Footer = ({ ...props }: IFooterProps): JSX.Element => {
  return (
    <footer className={styles.footer} {...props}>
      <div className={styles.footer_left}>
        <img src="/logo_min_light.svg" alt="logo" />
        <P>
          © QTB Korea LLC 2018 Gangnam-gu 311, 1206 Seoul, Republic of Korea{" "}
        </P>
      </div>
      <div className={styles.footer_right}>
        <a href="tel:+821080280599">+821080280599</a>
        <a href="mailto:info@qtbkorea.com">info@qtbkorea.com</a>
        <H3>CEO LAKIENKO MARIA</H3>
      </div>
    </footer>
  );
};
