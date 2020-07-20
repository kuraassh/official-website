import styled from "styled-components";
import { theme } from "@styles";

const { colors } = theme;

export const DesktopFooterCSS = styled.div`
  color: ${colors.offwhite};
  background-color: rgba(26, 26, 44, 1);
  padding: 25px;
  list-style-type: none;
  top: 5219px;
  left: 0px;
  width: 100%;
  display: flex;
  justify-content: center;

  .desktopFooter-left {
    margin-left: 20px;
    margin-right: 40px;
  }

  p {
    font-size: 14px;
    width: max-content;
  }

  ul li {
    margin: 10px;
  }

  ul li a {
    color: #fff;
    text-decoration: none;
  }

  hr {
    margin: 0px 0px 0px 25px;
  }
  li {
    margin-bottom: 1em;
    font-weight: 300;
    letter-spacing: 3px;
  }
  li:first-of-type {
    font-size: 16px;
    font-weight: 500;
  }
`;
