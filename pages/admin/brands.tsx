import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { H1, Input } from "../../components/elements";
import { useUser } from "../../hooks";
import { IBrandDB, IBrand } from "../../models/brands";
import { API } from "../../utils/api";

export default function newBrand() {
  const user = useUser({ redirectTo: '/login' })
  const { register, handleSubmit, watch, formState: { errors } } = useForm<IBrand>();
  const onSubmit: SubmitHandler<IBrand> = data => newBrand(data);
  const [brands, setBrands] = useState<IBrandDB[]| null>(null);
  const [brand, setBrand] = useState<IBrandDB | null>(null);


  // console.log(watch("title_ru"));

  useEffect(() => {
    API.brands.get({}, (data) => {
      setBrands(data);
    });
  }, [brand]);

  const newBrand = (data: IBrand) => {
    API.brands.create(
      {
        ...data,
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
      <H1>NEW BRAND</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="title" {...register("title", { required: true })} />
        <input placeholder="description" {...register("description", { required: true })} />
        <input placeholder="alias" {...register("alias", { required: true })} />
        <input placeholder="logo" {...register("logo", { required: true })} />
        <input placeholder="baner" {...register("baner", { required: true })} />
        {errors.description && <span>This field is required</span>}
        {errors.title && <span>This field is required</span>}
        
        <input type="submit" />
      </form>

      <pre>{JSON.stringify(brand, null, 2)}</pre>
      <pre>{JSON.stringify(brands, null, 2)}</pre>
    </>
  );
}