import styled from "styled-components";
import { media } from "@styles";

export const SocialMediaCSS = styled.div`
  height: 26px;
  width: 162px;
  padding: 0px;
  margin-bottom: 1em;

  svg path:hover {
    fill: rgba(250, 250, 250, 1);

    cursor: pointer;
  }
  a {
    padding-right: 5px;
  }

  ${media.bigDesktop`
  margin-top: 1.3rem;
  width: 20vw;
  a {
    padding-right: 15px;
    svg {
      height: 25px;
      width: 25px;
    }
  }`}
`;
