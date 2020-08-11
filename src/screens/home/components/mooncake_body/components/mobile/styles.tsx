import styled from "styled-components";
import { mixins, media } from "@styles";

export const BodyCSS = styled.div`
  ${media.bigDesktop`
    display: none;
  `}
`;

export const ContentCSS = styled.div`
  ${mixins.mobileHorizontalPadding}
  ${mixins.mobileBottomPadding}
  margin-top: -12rem;
`;

export const HeroCSS = styled.div`
  background-image: url(static/images/assets/desmos-hero.png);
  background-size: 134%;
  background-repeat: no-repeat;
  background-position: left bottom;
  height: 15rem;
  width: 100%;
  // div::before {
  //   z-inde: -1;
  //   transform: rotate(180deg);
  // }
`;
