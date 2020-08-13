import styled from "styled-components";
import { theme, media, mixins } from "@styles";

export const NewsHeaderCSS = styled.div`
  ${mixins.mobilePadding}
  h2 {
    margin-bottom: 0.5rem;
    font-weight: 500;
  }
  p {
    line-height: 1.5;
  }
  ${media.tablet`
  
  
  `}
`;
