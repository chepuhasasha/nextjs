import Head from "next/head";
import { Button } from "../components/elements";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";

export default function Home() {
  const [data, setData] = useState({})
  const newBrand = async () => {
    await axios
      .put("http://localhost:3000/api/brands", {
        title: "Ultra V",
        description: { ru: "Описание...", en: "description..." },
        logo: "test logo",
        baner: "test baner",
        alias: "ultra_v"
      })
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className="container">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button appearance="ghost" onClick={newBrand}>
          New Brand
        </Button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </main>

      <footer></footer>
    </div>
  );
}
