import Router from "next/router";
import { API } from "../../../utils/api";
import { Button, H3, P } from "../../elements";
import styles from "./Brand.module.sass";
import type { IBrandProps } from "./Brand.props";

export const BrandAdminPreview = ({
  brand,
  ...props
}: IBrandProps): JSX.Element => {
  const deleteBrand = () => {
    API.brands.delete({_id: brand._id}, () => {
      console.log('deleted')
    })
  }
  return (
    <div className={styles.brand_admin} {...props}>
      <div className={styles.brand_admin_head}>
        <img src={brand.logo} alt="" />
        <H3 style={{width: "100%"}}>
          {brand.title}
        </H3>
        <Button appearance="danger"
          onClick={deleteBrand}
        >
          Delete
        </Button>
        <Button
          onClick={() => {
            Router.push(`/brands/${brand.alias}`);
          }}
        >
          Update
        </Button>
      </div>
      <P size="s">{brand.description}</P>
      <div className={styles.brand_admin_footer}>
        <Button
          onClick={() => {
            Router.push(`/brands/${brand.alias}`);
          }}
        >
          Open
        </Button>
      </div>
    </div>
  );
};
