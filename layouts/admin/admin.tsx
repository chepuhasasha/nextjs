import Head from "next/head";
import styles from './admin.module.sass'
import { FunctionComponent } from "react";
import { Header } from "../../components/blocks/Header/Header";
import { useUser } from "../../hooks";
import { IAdminLayoutProps } from "./admin.props";

export const AdminLayout = ({
  children,
  title,
}: IAdminLayoutProps): JSX.Element => {
  const user = useUser("/login");
  const links = [
    {name: 'BRANDS', path: '/admin/brands'},
    {name: 'PRODUCTS', path: '/admin/products'},
  ]

  return (
    <>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.admin}>
        <Header links={links}/>
        <div className={styles.admin_content}>
          {children}
        </div>
      </main>
    </>
  );
};

export const withAdminLayout = <T extends Record<string, unknown>>(
  Component: FunctionComponent<T>
) => {
  return function withLayoutComponent(props: T): JSX.Element {
    return (
      <AdminLayout title='ADMIN'>
        <Component {...props} />
      </AdminLayout>
    );
  };
};
