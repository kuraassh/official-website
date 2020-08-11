import React from "react";
import { BodyCSS, HeroCSS, ContentCSS } from "./styles";
import { MooncakeDetails, MooncakeImg } from "@components";

const Mobile = () => {
  return (
    <BodyCSS>
      <HeroCSS></HeroCSS>
      <ContentCSS>
        <MooncakeImg />
        <MooncakeDetails />
      </ContentCSS>
    </BodyCSS>
  );
};

export default Mobile;
