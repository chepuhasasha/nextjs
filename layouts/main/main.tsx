import Head from "next/head";
import styles from './main.module.sass'
import { FunctionComponent } from "react";
import { Header } from "../../components/blocks/Header/Header";
import { IMainLayoutProps } from "./main.props";
import { Footer } from "../../components/blocks/Footer/Footer";

export const MainLayout = ({
  children,
  title,
}: IMainLayoutProps): JSX.Element => {
  const links = [
    {name: 'SHOP', path: '/brands'},
  ]

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header links={links}/>
        <div className={styles.main_content}>
          {children}
        </div>
      </main>
      <Footer/>
    </>
  );
};

export const withMainLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <MainLayout title='ADMIN'>
        <Component {...props} />
      </MainLayout>
    );
  };
};
