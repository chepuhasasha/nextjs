import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { BrandAdminPreview } from "../../components/blocks";
import { IBrandDB } from "../../models/brands";
import { API } from "../../utils/api";

export default function BrandPage({ brand }) {
  return (
    <div className="container">
      <Head>
        <title>{brand?.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>{brand && <BrandAdminPreview brand={brand} />}</main>

      <footer></footer>
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const {data: brands} = await axios.post<IBrandDB[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/brands",
    {}
  );
  return {
    paths: brands.map((brand) => `/brands/${brand.alias}`),
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const {data: brand} = await axios.post<IBrandDB[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/brands",
    {alias: params.alias}
  );
  if(brand.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      brand: brand[0],
    },
  };
};
