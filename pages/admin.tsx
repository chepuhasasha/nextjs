import Head from "next/head";
import { Button, H1, Input } from "../components/elements";
import { useEffect, useRef, useState } from "react";
import { IBrand } from "../models/brands";
import { API } from "../utils/api";
import { IProduct } from "../models/products";
import { IProductsList } from "../models/productsList";

export default function Home() {
  const [data, setData] = useState<IBrand | IProduct | IProductsList| null>(null);
  const [brands, setBrands] = useState({});
  const newBrandItem = useRef('123') 
  const newBrand = () => {
    API.brands.create(
      {
        title: "Ultra V",
        description: { ru: "Описание...", en: "description..." },
        logo: "test logo",
        baner: "test baner",
        alias: "ultra_v"+ Math.random(),
      },
      (data) => {
        setData(data);
      }
    );
  };
  const newProduct = () => {
    API.products.create(
      {
        title: {ru: "тест", en: 'test'},
        description: { ru: "Описание...", en: "description..." },
        brand_id: "63564035899bd78019f32101",
        buy_links: [{marketplace: "ozon", link: "ozon"}],
        characteristics: [{name: {ru: "характеристика", en: 'characteristic'}, value: {ru: "тест", en: 'test'}}],
        images: [],
        tags: [],
        price: {ru: "100руб.", en: '100000usd'},
        model: "test",
        preview: "test"
      },
      (data) => {
        setData(data);
      }
    );
  };
  const newProductsList = () => {
    API.productsList.create(
      {
        title: {ru: "тест", en: 'test'},
        description: { ru: "Описание...", en: "description..." },
        products: []
      },
      (data) => {
        setData(data);
      }
    );
  };
  const deleteBrand = () => {
    API.brands.delete(
      {
        title: 'Ultra V'
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
        <H1>{newBrandItem.current}</H1>
        <Input model={newBrandItem}/>
        <Button appearance="ghost" onClick={newBrand}>
          New Brand
        </Button>
        <Button appearance="ghost" onClick={newProduct}>
          New Product
        </Button>
        <Button appearance="ghost" onClick={newProductsList}>
          New ProductsList
        </Button>
        <Button appearance="ghost" onClick={deleteBrand}>
          Delete Brand
        </Button>
        <pre>{JSON.stringify(data, null, 2)}</pre>
        <pre>{ JSON.stringify(brands, null, 2) }</pre>
      </main>

      <footer></footer>
    </div>
  );
}
