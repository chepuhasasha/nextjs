import Head from "next/head";
import Router from "next/router";
import { useForm, SubmitHandler } from "react-hook-form";
import { Form } from "../components/blocks";
import { Input } from "../components/elements";
import { Block, Grid } from "../components/wrappers";
import { API } from "../utils/api";

type UserForm = {
  username: string;
  password: string;
  key: string
};

export default function LogIn() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<UserForm>();
  const { ref: username, ...restUsername } = register("username", {
    required: true,
  });
  const { ref: password, ...restPassword } = register("password", {
    required: true,
  });
  const { ref: key, ...restKey } = register("key", {
    required: true,
  });
  const onSubmit: SubmitHandler<UserForm> = (data: UserForm) => {
    API.signup(
      {
        ...data,
      },
      (res) => {
        console.log(res);
        Router.push("/login");
      },
      (err) => {
        console.log(err);
      }
    );
  };

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container">
        <Grid rows="1fr" cols="1fr 400px 1fr">
          <Block area="1/2/2/3" justify="center">
            <Form title="Sign Up" onSubmit={handleSubmit(onSubmit)}>
              <Input
                label="Username"
                register={username}
                {...restUsername}
              />
              <Input
                label="Password"
                type="password"
                register={password}
                {...restPassword}
              />
              <Input
                label="Key"
                type="password"
                register={key}
                {...restKey}
              />
            </Form>
          </Block>
        </Grid>
      </main>
    </>
  );
}
