import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Select, Textarea } from "../../components/elements";
import { Form, MapObject, PhotosInput } from "../../components/blocks";
import { API } from "../../utils/api";
import { Block, Grid } from "../../components/wrappers";
import axios from "axios";
import { GetStaticProps } from "next";
import Router from "next/router";
import { IProductDB } from "../../models/products";
import { withAdminLayout } from "../../layouts/admin/admin";
import { IBrandDB } from "../../models/brands";
import { ProductCard } from "../../components/blocks/Product/Product";

function Products({
  products,
  brands,
}: {
  products: IProductDB[];
  brands: IBrandDB[];
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IProductDB>();
  const onSubmit: SubmitHandler<IProductDB> = (data) => newProduct(data);
  const { ref: title, ...restTitle } = register("title", { required: true });
  const { ref: brand, ...restBrand } = register("brand_id", { required: true });
  const { ref: description, ...restDescription } = register("description", {
    required: true,
  });
  const [baner, setBaner] = useState<string | null>(null);
  const [photos, setPhotos] = useState<string[]>([]);
  const [characteristics, setCharacteristics] = useState<
    Record<string, string>
  >({});
  const [buy_links, setBuyLinks] = useState<Record<string, string>>({});

  const newProduct = (data: IProductDB) => {
    if (!baner && photos.length == 0) {
      alert("select baner");
      return;
    } else {
      API.products.create(
        {
          ...data,
          baner: baner as string,
          images: photos,
          characteristics,
          buy_links,
        },
        (res) => {
          console.log(res);
          Router.reload();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  };

  return (
    <Grid rows="repeat(4, 1fr)" cols="repeat(3, 1fr) 400px">
      <Block area="1/3/5/5">
        <Form
          title="NEW PRODUCT"
          description="create new product"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            error={errors.title && "required field"}
            label="Title"
            placeholder="some product title ..."
            register={title}
            {...restTitle}
          />
          <Textarea
            rows={15}
            label="Description"
            placeholder="test"
            register={description}
            {...restDescription}
          />
          <Select
            error={errors.title && "required field"}
            label="Brand"
            placeholder="brand"
            register={brand}
            options={brands.map((b) => ({ name: b.title, value: b._id }))}
            {...restBrand}
          />
          <MapObject
            label="ADD CHARACTERISTIC"
            changeMap={(data) => setCharacteristics(data)}
          />
          <MapObject
            label="ADD LINKS"
            changeMap={(data) => setBuyLinks(data)}
          />
          <PhotosInput
            label="ADD BANER"
            text="1000X1000 px"
            onFileLoad={(files) => setBaner(files[0])}
          />
          <PhotosInput
            label="ADD PHOTOS"
            multy={true}
            text="1000X1000 px"
            onFileLoad={(files) => setPhotos(files)}
          />
        </Form>
      </Block>
      <Grid rows="auto" cols="1fr" area="1/1/5/3">
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
      </Grid>
    </Grid>
  );
}

export default withAdminLayout(Products);
const domain =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_DOMAIN
    : process.env.NEXT_PUBLIC_DOMAIN;

export const getStaticProps: GetStaticProps = async () => {
  const products = await axios
    .post<IProductDB[]>(domain + "/api/products", {})
    .then((res) => res.data);
  const brands = await axios
    .post<IBrandDB[]>(domain + "/api/brands", {})
    .then((res) => res.data);

  return {
    props: {
      products,
      brands,
    },
  };
};
