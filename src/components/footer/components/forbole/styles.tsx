import styled from "styled-components";
import { media } from "@styles";

export const ForboleCSS = styled.div`
  text-align: left;
  margin-bottom: 1em;
  margin-top: 1em;
  img {
    height: 16px;
    width: 83px;
  }
  p {
    font-size: 14px;
    font-weight: 400;
  }

  ${media.bigDesktop`

  p {
  font-weight: 300;
    height: 20px;
  }
  img {
    height: 30px;
    width: 155px;
  }`}
`;
