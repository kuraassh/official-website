import styled from "styled-components";
import { media, theme, mixins } from "@styles";
import {
  CONTAINER_HEIGHT,
  CONTAINER_WIDTH,
  CONTAINER_MIN_HEIGHT,
} from "../../../../config";

export const DesktopCSS = styled.div`
  display: none;
  ${media.bigDesktop`
    min-height: ${CONTAINER_MIN_HEIGHT};
    ${mixins.flexCenter}
    flex-direction: row;
    background: white;
    `}
`;

export const WrapperCSS = styled.div`
  ${media.bigDesktop`
  ${mixins.desktopMaxWidth}
  ${mixins.flexBetween}
  width: 100%;
    .mooncake {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      // height: ${CONTAINER_HEIGHT};
      width: 100%;
      padding-left: 15rem;
    }
`}
`;

export const MooncakeBodyCSS = styled.div`
  background: linear-gradient(
      0deg,
      rgba(123, 135, 185, 0.33),
      rgba(123, 135, 185, 0.33)
    ),
    url(static/images/assets/desmos-hero.png);
  background-repeat: no-repeat;
  background-position: left bottom;
  transform: scaleX(-1);
  width: 100%;
  height: ${CONTAINER_HEIGHT};
  min-height: ${CONTAINER_MIN_HEIGHT};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

export const MooncakeContentCSS = styled.div`
  // padding-left: 15rem;
  // margin-right: 8.5rem;
  max-width: 700px;
`;

export const MooncakeImgCSS = styled.div`
  transform: scaleX(-1);
  position: absolute;
  // right: -450px;
  left: -70px;
  top: 20%;
  max-height: 45vh;
`;
