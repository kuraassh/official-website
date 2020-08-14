import styled from "styled-components";
import { mixins, media } from "@styles";

export const BlogPostCSS = styled.div`
  ${mixins.mobilePadding}
  padding-top: 1rem;
  display: grid;
  grid-gap: 20px;
  ${media.bigDesktop`
   display: none;
  `}
`;
