import Head from "next/head";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "../components/blocks";
import { H1, Input } from "../components/elements";
import { Block, Grid } from "../components/wrappers";
import { API } from "../utils/api";

type UserForm = {
  username: string;
  password: string;
};

export default function LogIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserForm>();
  const { ref: username, ...restUsername } = register("username", {
    required: true,
  });
  const { ref: password, ...restPassword } = register("password", {
    required: true,
  });
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
  };

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Grid rows="1fr" cols="1fr 400px 1fr">
          <Block area="1/2/2/3">
            <Form title="Login" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Username"
                placeholder="test"
                register={username}
                {...restUsername}
              />
              <Input
                label="Password"
                type='password'
                placeholder="test"
                register={password}
                {...restPassword}
              />
            </Form>
          </Block>
        </Grid>
      </main>
    </>
  );
}
