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
    <WrapperCSS>
      <DesktopCSS>
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
      </DesktopCSS>
    </WrapperCSS>
  );
};

export default Desktop;
