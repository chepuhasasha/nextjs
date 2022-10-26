import { useEffect, useRef, useState } from "react";
import { useForm, SubmitHandler, UseFormRegisterReturn } from "react-hook-form";
import { H1, H2, Input, Textarea } from "../../components/elements";
import { BrandAdminPreview, FileImgInput, Form } from "../../components/blocks";
import { useUser } from "../../hooks";
import { IBrandDB, IBrand } from "../../models/brands";
import { API } from "../../utils/api";
import { Block, Grid } from "../../components/wrappers";
import Head from "next/head";

export default function newBrand() {
  const user = useUser("/login");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IBrand>();
  const onSubmit: SubmitHandler<IBrand> = (data) => newBrand(data);
  const [brands, setBrands] = useState<IBrandDB[] | null>(null);
  const [brand, setBrand] = useState<IBrandDB | null>(null);
  const { ref: title, ...restTitle } = register("title", { required: true });
  const { ref: description, ...restDescription } = register("description", {
    required: true,
  });
  const { ref: alias, ...restAlias } = register("alias", { required: true });
  const [selectedLogo, setSelectedLogo] = useState<string | null>(null);
  const [selectedBaner, setSelectedBaner] = useState<string | null>(null);

  useEffect(() => {
    API.brands.get({}, (data) => {
      setBrands(data);
    });
  }, [brand]);

  const newBrand = (data: IBrand) => {
    if (!selectedLogo && !selectedBaner) {
      alert("select logo");
      return;
    }
    API.brands.create(
      {
        ...data,
        logo: selectedLogo,
        baner: selectedBaner
      },
      (res) => {
        setBrand(res);
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Grid rows="repeat(4, 1fr)" cols="repeat(3, 1fr) 400px">
          <Block area="1/4/5/5">
            <Form
              title="NEW BRAND"
              description="create new brand"
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
                rows='14'
                label="Description"
                placeholder="test"
                register={description}
                {...restDescription}
              />
              <FileImgInput text='Add logo...' onFileSelect={(file) => setSelectedLogo(file)} />
              <FileImgInput text='Add baner...' onFileSelect={(file) => setSelectedBaner(file)} />
            </Form>
          </Block>
          <Grid rows="auto" cols='1fr' area="1/1/5/4">
            {brands?.map((brand) => (<BrandAdminPreview key={brand._id} brand={brand} />))}
          </Grid>
        </Grid>
      </main>
    </>
  );
}
