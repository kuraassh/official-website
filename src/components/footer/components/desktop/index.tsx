import React from "react";
import SocialMedia from "../social_media";
import Subscribe from "../subscribe";
import Forbole from "../forbole";
import FooterItems from "../footer_items";
import { DesktopFooterCSS } from "./styles";

const DesktopFooter = () => {
  return (
    <DesktopFooterCSS>
      <Forbole />
      <FooterItems />
      <Subscribe />
      <SocialMedia />
    </DesktopFooterCSS>
  );
};

export default DesktopFooter;
