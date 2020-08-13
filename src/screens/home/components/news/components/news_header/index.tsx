import React from "react";
import { useTranslation } from "i18n";
import { NewsHeaderCSS } from "./styles";

const NewsHeader = () => {
  const { t } = useTranslation("home");
  return (
    <NewsHeaderCSS>
      <h2>{t("whatsNews")}</h2>
      <p>{t("placeholder")}</p>
    </NewsHeaderCSS>
  );
};

export default NewsHeader;
