import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { H1, H2, Input, Textarea } from "../../components/elements";
import { FileImgInput, Form } from "../../components/blocks";
import { useUser } from "../../hooks";
import { API } from "../../utils/api";
import { Block, Grid } from "../../components/wrappers";
import axios from "axios";
import { GetStaticProps } from "next";
import Router from "next/router";
import { IProductDB } from "../../models/products";
import { withAdminLayout } from "../../layouts/admin/admin";

function Products({ products }: { brands: IProductDB[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductDB>();
  const onSubmit: SubmitHandler<IProductDB> = (data) => newProduct(data);
  const { ref: title, ...restTitle } = register("title", { required: true });
  const { ref: description, ...restDescription } = register("description", {
    required: true,
  });
  const { ref: alias, ...restAlias } = register("alias", { required: true });
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [selectedBaner, setSelectedBaner] = useState<string | null>(null);

  const newProduct = (data: IProductDB) => {
    if (!selectedLogo && !selectedBaner) {
      alert("select logo");
      return;
    }
    API.products.create(
      {
        ...data,
        logo: selectedLogo,
        baner: selectedBaner,
      },
      (res) => {
        console.log(res);
        Router.reload();
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <Grid rows="repeat(4, 1fr)" cols="repeat(3, 1fr) 400px">
      <Block area="1/4/5/5">
        <Form
          title="NEW PRODUCT"
          description="create new product"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            error={errors.title && "required field"}
            label="Title"
            placeholder="test"
            register={title}
            {...restTitle}
          />
          <Input
            label="Alias"
            placeholder="test"
            register={alias}
            {...restAlias}
          />
          <Textarea
            rows="14"
            label="Description"
            placeholder="test"
            register={description}
            {...restDescription}
          />
          <FileImgInput
            text="Add logo..."
            onFileSelect={(file) => setSelectedLogo(file)}
          />
          <FileImgInput
            text="Add baner..."
            onFileSelect={(file) => setSelectedBaner(file)}
          />
        </Form>
      </Block>
      <Grid rows="auto" cols="1fr" area="1/1/5/4">
        {/* {products && products.map((product) => (<BrandAdminPreview key={product._id} product={brand} />))} */}
      </Grid>
    </Grid>
  );
}

export default withAdminLayout(Products);

export const getStaticProps: GetStaticProps = async () => {
  const { data: products } = await axios.post<IProductDB[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/products",
    {}
  );

  return {
    props: {
      products,
    },
  };
};
