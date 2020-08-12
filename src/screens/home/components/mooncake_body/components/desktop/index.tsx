import React from "react";
import { MooncakeDetails, MooncakeImg } from "@components";
import {
  DesktopCSS,
  MooncakeContentCSS,
  MooncakeBodyCSS,
  MooncakeImgCSS,
  WrapperCSS,
} from "./styles";

const Desktop = () => {
  return (
    <DesktopCSS>
      <WrapperCSS>
        <MooncakeBodyCSS>
          <MooncakeContentCSS>
            <MooncakeImgCSS>
              <MooncakeImg />
            </MooncakeImgCSS>
          </MooncakeContentCSS>
        </MooncakeBodyCSS>
        <div className="mooncake">
          <MooncakeDetails />
        </div>
      </WrapperCSS>
    </DesktopCSS>
  );
};

export default Desktop;
