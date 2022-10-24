import Head from "next/head";
import { BrandItemM } from "../components/blocks";
import { Button } from "../components/elements";
import axios from "axios";
import { useEffect, useState } from "react";
import { IBrand } from "../models/brands";
import { API } from "../utils/api";

export default function Home() {
  const [data, setData] = useState<IBrand | null>(null);
  const [brands, setBrands] = useState({});
  const newBrand = () => {
    API.brands.create(
      {
        title: "Ultra V",
        description: { ru: "Описание...", en: "description..." },
        logo: "test logo",
        baner: "test baner",
        alias: "ultra_v",
      },
      (data) => {
        setData(data);
      }
    );
  };
  const deleteBrand = () => {
    API.brands.delete(
      {
        alias: 'ultra_v'
      },
      (data) => {
        setData(data);
      }
    );
  };

  useEffect(() => {
    API.brands.get({}, (data) => {
      setBrands(data);
    });
  }, [data]);

  return (
    <div className="container">
      <Head>
        <title>ADMIN</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Button appearance="ghost" onClick={newBrand}>
          New Brand
        </Button>
        <Button appearance="ghost" onClick={deleteBrand}>
          Delete Brand
        </Button>
        <BrandItemM brand={data}></BrandItemM>
        <pre>{ JSON.stringify(brands, null, 2) }</pre>
      </main>

      <footer></footer>
    </div>
  );
}
