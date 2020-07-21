import React from "react";
import { useTranslation } from "i18n";
import { Layout } from "@components";
import { NotFoundCSS } from "./styles";

const NotFound = () => {
  const { t } = useTranslation("404");
  return (
    <NotFoundCSS>
      <img src="images/icons/404_unicorn.svg" />
      <div className="content">
        <h3>{t("title")}</h3>
        <p>{t("content")}</p>
      </div>
    </NotFoundCSS>
  );
};

export default NotFound;