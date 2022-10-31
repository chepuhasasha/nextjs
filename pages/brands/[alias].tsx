import axios from "axios";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useEffect, useState } from "react";
import { BrandAdminPreview } from "../../components/blocks";
import { H1, P } from "../../components/elements";
import { Block, Grid } from "../../components/wrappers";
import { MainLayout } from "../../layouts/main/main";
import { IBrandDB } from "../../models/brands";
import { API } from "../../utils/api";

export default function BrandPage({ brand }: {brand: IBrandDB}) {
  return (
    <MainLayout title={brand.title}>
      <Grid rows="repeat(10, max-content)" cols="repeat(3, 1fr)">
        <Block area='1/1/2/4' padding="0">
          <img src={brand.baner} alt="" height={300}/>
        </Block>
        <Block area='2/1/3/4' padding="40px">
            <H1>{brand.title}</H1>
          <P>{brand.description}</P>
          {/* {brand && <BrandAdminPreview brand={brand} />} */}
        </Block>
      </Grid>
    </MainLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data: brands } = await axios.post<IBrandDB[]>(
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
  const { data: brand } = await axios.post<IBrandDB[]>(
    process.env.NEXT_PUBLIC_DOMAIN + "/api/brands",
    { alias: params.alias }
  );
  if (brand.length === 0) {
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
