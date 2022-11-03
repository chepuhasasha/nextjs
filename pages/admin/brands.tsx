import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Input, Textarea } from "../../components/elements";
import { BrandAdminPreview, Form, PhotosInput } from "../../components/blocks";
import { IBrandDB, IBrand } from "../../models/brands";
import { API } from "../../utils/api";
import { Block, Grid } from "../../components/wrappers";
import axios from "axios";
import { GetStaticProps } from "next";
import Router from "next/router";
import { withAdminLayout } from "../../layouts/admin/admin";

function Brands({ brands }: { brands: IBrandDB[] }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBrand>();
  const onSubmit: SubmitHandler<IBrand> = (data) => newBrand(data);
  const { ref: title, ...restTitle } = register("title", { required: true });
  const { ref: description, ...restDescription } = register("description", {
    required: true,
  });
  const { ref: alias, ...restAlias } = register("alias", { required: true });
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [selectedBaner, setSelectedBaner] = useState<string | null>(null);

  const newBrand = (data: IBrand) => {
    console.log(selectedLogo);
    if (!selectedLogo && !selectedBaner) {
      alert("select logo");
      return;
    } else {
      API.brands.create(
        {
          ...data,
          logo: selectedLogo as string,
          baner: selectedBaner as string,
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
          title="NEW BRAND"
          description="create new brand"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Input
            error={errors.title && "required field"}
            label="Title"
            placeholder="some product name ..."
            register={title}
            {...restTitle}
          />
          <Input
            label="Alias"
            placeholder="like: vue_de_pulang"
            register={alias}
            {...restAlias}
          />
          <Textarea
            rows={19}
            label="Description"
            placeholder="test"
            register={description}
            {...restDescription}
          />
          <PhotosInput
            label="ADD LOGO"
            text="1000X1000 px"
            onFileLoad={(file) => setSelectedLogo(file[0])}
          />
          <PhotosInput
            label="ADD BANER"
            text="1000X1000 px"
            onFileLoad={(file) => setSelectedBaner(file[0])}
          />
        </Form>
      </Block>
      <Grid rows="auto" cols="1fr" area="1/1/5/3">
        {brands &&
          brands.map((brand) => (
            <BrandAdminPreview key={brand._id} brand={brand} />
          ))}
      </Grid>
    </Grid>
  );
}

export default withAdminLayout(Brands);

const domain =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_DEV_DOMAIN
    : process.env.NEXT_PUBLIC_DOMAIN;
export const getStaticProps: GetStaticProps = async () => {
  const { data: brands } = await axios.post<IBrandDB[]>(
    domain + "/api/brands",
    {}
  );

  return {
    props: {
      brands,
    },
  };
};
