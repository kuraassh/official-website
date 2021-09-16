import React from "react";
import { useTranslation } from "i18n";
import Image from "next/image";
import { DashboardContentCSS } from "./styles";
import { Go } from "@icons";

export const DashboardContent = () => {
  const { t } = useTranslation("products");
  return (
    <DashboardContentCSS>
      <div className="desktopWrapper">
        <div className="image-container">
          <Image
            src="/static/images/assets/forbole-x-screenshot.png"
            alt="Forbole X Screenshot"
            className="image"
            layout="fill"
          />
        </div>
        <img
          src="/static/images/assets/portal-ellipse.png"
          alt="Portal ellipse"
          className="pbg"
        ></img>
        <div className="content">
          <ul>
            <h1>{t("forboleX")}</h1>
            <li>{t("fp1")}</li>
            <li>{t("fp2")}</li>
            <li>{t("fp3")}</li>
          </ul>
          <a href="https://www.desmos.network/">
            {t("learnMore")} <Go />
          </a>
        </div>
      </div>
    </DashboardContentCSS>
  );
};

export default DashboardContent;
