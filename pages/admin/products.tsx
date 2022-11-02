import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { H1, H2, Input, Select, Textarea } from "../../components/elements";
import { FileImgInput, Form } from "../../components/blocks";
import { useUser } from "../../hooks";
import { API } from "../../utils/api";
import { Block, Grid } from "../../components/wrappers";
import axios from "axios";
import { GetStaticProps } from "next";
import Router from "next/router";
import { IProductDB } from "../../models/products";
import { withAdminLayout } from "../../layouts/admin/admin";
import { IBrandDB } from "../../models/brands";
import { ProductCard } from "../../components/blocks/Product/Product";
import { PhotosInput } from "../../components/blocks/PhotosInput/PhotosInput";

function Products({
  products,
  brands,
  images
}: {
  products: IProductDB[];
  brands: IBrandDB[];
  images: string[]
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
  // const [images, setImages] = useState<string[]>([]);

  const addPhoto = (image: string[]) => {
    // setImages([...images]);
    console.log(image)
  };

  const newProduct = (data: IProductDB) => {
    // if (!baner) {
    //   alert("select baner");
    //   return;
    // }
    console.log(data, images);
    API.products.create(
      {
        ...data,
        baner,
        images
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
          <Select
            error={errors.title && "required field"}
            label="Brand"
            placeholder="brand"
            register={brand}
            options={brands.map((b) => ({ name: b.title, value: b._id }))}
            {...restBrand}
          />
          <Select
            error={errors.title && "required field"}
            label="Brand"
            placeholder="brand"
            register={brand}
            options={images.map((i) => ({ name: i, value: i }))}
            {...restBrand}
          />
          <Input
            error={errors.title && "required field"}
            label="Title"
            placeholder="test"
            register={title}
            {...restTitle}
          />
          <Textarea
            rows="14"
            label="Description"
            placeholder="test"
            register={description}
            {...restDescription}
          />
          <FileImgInput
            text="Add baner..."
            onFileSelect={(file) => setBaner(file)}
          />
          <PhotosInput
            label="ADD PHOTOS"
            text="1000X1000 px"
            onFileLoad={(file) => addPhoto(file)}
          />
        </Form>
      </Block>
      <Grid rows="auto" cols="1fr" area="1/1/5/4">
        <pre>{JSON.stringify(brands, null, 2)}</pre>
        {products &&
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
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
  const { data: brands } = await axios.post<IBrandDB[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/brands",
    {}
  );
  const { data: images } = await axios.get<string[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/images",
    {}
  );

  return {
    props: {
      products,
      brands,
      images
    },
  };
};
