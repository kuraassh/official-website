import styled from "styled-components";
import { mixins, media } from "@styles";
import { CoverCSS } from "@styles/components";

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

export const HeroCSS = styled(CoverCSS)`
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.68),
      rgba(0, 0, 0, 0.68)
    ),
    url(static/images/assets/desmos-hero.png);
  // transform: scaleX(-1);
  background-position: left bottom;
  height: 15rem;
  width: 100%;
`;
