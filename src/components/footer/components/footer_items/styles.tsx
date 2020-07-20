import styled from "styled-components";
import { theme, media } from "@styles";

const { colors } = theme;

export const FooterItemsCSS = styled.div`
  color: ${colors.offwhite};
  background-color: rgba(26, 26, 44, 1);
  list-style-type: none;
  text-align: left;
  width: 100%;
  .ui {
    margin-bottom: 1em;
  }
  hr {
    margin-bottom: 1em;
    opacity: 0.3;
  }

  ${media.phone`
  li {
    margin-bottom: 1em;
  }
  li:first-of-type {
    font-size: 16px;
    font-weight: 500;
  `};
  ${media.bigDesktop`
  display: flex;
  justify-content: center;
  align-items: start;
  flex-grow: 1;
  margin: 13px;
  `};
`;
