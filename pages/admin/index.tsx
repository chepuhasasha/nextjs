import Router from "next/router";
import { Button } from "../../components/elements";
import { Block } from "../../components/wrappers";
import { withAdminLayout } from "../../layouts/admin/admin";

function Admin() {
  return (
    <Block align="center" justify="center">
      <Button
        onClick={() => {
          Router.push(`/admin/brands`);
        }}
      >
        Brands
      </Button>
      <Button
        onClick={() => {
          Router.push(`/admin/products`);
        }}
      >
        Products
      </Button>
    </Block>
  );
}

export default withAdminLayout(Admin);
