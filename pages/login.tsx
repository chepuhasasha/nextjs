import { useForm, SubmitHandler } from "react-hook-form";
import { H1 } from "../components/elements";
import { API } from "../utils/api";

type UserForm = {
  username: string,
  password: string
}

export default function LogIn() {
  const { register, handleSubmit, formState: { errors } } = useForm<UserForm>();
  const onSubmit: SubmitHandler<UserForm> = (data: UserForm) => {
    API.login(
      {
        ...data,
      },
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  return (
    <>
      <H1>LOGIN</H1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="username" {...register("username", { required: true })} />
        <input placeholder="password" {...register("password", { required: true })} />
        
        <input type="submit" />
      </form>
    </>
  );
}