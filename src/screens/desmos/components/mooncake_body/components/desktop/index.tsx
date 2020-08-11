import React from "react";
import { MooncakeDetails, MooncakeImg } from "@components";
import {
  DesktopCSS,
  MooncakeContentCSS,
  MooncakeBodyCSS,
  MooncakeImgCSS,
} from "./styles";

const Desktop = () => {
  return (
    <DesktopCSS>
      <MooncakeBodyCSS>
        <MooncakeContentCSS>
          <MooncakeDetails />
          <MooncakeImgCSS>
            <MooncakeImg />
          </MooncakeImgCSS>
        </MooncakeContentCSS>
      </MooncakeBodyCSS>
    </DesktopCSS>
  );
};

export default Desktop;
