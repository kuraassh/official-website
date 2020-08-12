import styled from "styled-components";
import { media, theme, mixins } from "@styles";
import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  CONTAINER_MIN_HEIGHT,
} from "../../../../config";

const { colors } = theme;

export const WrapperCSS = styled.div`
  // ${media.bigDesktop`
  // height: ${CONTAINER_HEIGHT};
  // width: ${CONTAINER_WIDTH};
  // min-height: ${CONTAINER_MIN_HEIGHT};
  // // ${mixins.flexCenter}
`}
`;

export const DesktopCSS = styled.div`
  display: none;
  ${media.bigDesktop`
    display: flex;
    flex-direction: row;
    align-items: center;
    background: white;
    .mooncake {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      height: ${CONTAINER_HEIGHT};
      width: 35rem;
      min-height: ${CONTAINER_MIN_HEIGHT};
    }
  `}
`;

export const MooncakeBodyCSS = styled.div`
  background: url(static/images/assets/desmos-hero.png);
  background-size: 134%;
  background-repeat: no-repeat;
  background-position: left bottom;
  height: 10rem;
  width: ${CONTAINER_WIDTH};
  // min-height: ${CONTAINER_MIN_HEIGHT};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

export const MooncakeContentCSS = styled.div`
  padding-left: 5rem;
  margin-right: 8.5rem;
  max-width: 700px;
`;

export const MooncakeImgCSS = styled.div`
  position: absolute;
  // right: -450px;
  left: 100px;
  top: 20%;
  max-height: 45vh;
`;
