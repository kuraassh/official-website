import styled from "styled-components";
import { theme, mixins } from "@styles";

const { colors } = theme;

export const HeroContentCSS = styled.div`
  // ${mixins.mobilePadding}
  ${mixins.flexCenter}
  padding: 2.5rem 1rem 1rem;
  color: ${colors.white};
  width: 100%;
  flex-direction: column;
  background-image: linear-gradient(0deg, rgb(0, 0, 0, 0.4), rgb(0, 0, 0, 0.1)),
    url("static/images/assets/horse.png");
  background-size: 444%;
  background-repeat: no-repeat;
  background-position: 50% 52%;
  min-height: 90vh;
`;

export const MainContentCSS = styled.div`
  ${mixins.flexCenter}
  flex-direction: column;
  text-align: center;
  width: 100%;
  h1 {
    font-size: 1.8rem;
    font-weight: 100;
    line-height: 1rem;
    margin-bottom: 1rem;
  }
  p {
    font-size: 0.9rem;
  }
`;

export const HomeIconsCSS = styled.div`
  .icon {
    border-radius: 0.5rem;
    border: 1px solid ${colors.white};
  }
  svg {
    width: 20px;
    height: 20px;
  }
  svg > path {
    fill: ${colors.black};
  }
`;
