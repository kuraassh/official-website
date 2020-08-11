import React from "react";
import Link from "next/link";
import Head from "next/head";
import { HeroContent, SupportedNetworks } from "./components";
import { Layout } from "@components";
import { useTranslation } from "i18n";
import { HomeCSS } from "./styles";

const Home = () => {
  const { t } = useTranslation("home");
  return (
    <Layout title={t("home")}>
      <HomeCSS>
        <Head>
          <title>{t("forbole")}</title>
        </Head>
        <HeroContent />
        <SupportedNetworks />
      </HomeCSS>
    </Layout>
  );
};

export default Home;
