import { createGlobalStyle } from "styled-components";
import fontImport from "./fonts";
import theme from "./theme";

const { fonts } = theme;

const GlobalCSS = createGlobalStyle`
  ${fontImport}

  html {
    font-size: 16px;
    box-sizing: border-box;
    width: 100%;
  }

  * {
    margin: 0;
    padding: 0;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    width: 100%;
    min-height: 100%;
    line-height: 1.5;
    font-family: ${fonts.hind} !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: ${fonts.hind} !important;
    font-weight: 600;
    margin: 0 0 2rem 0;
  }

  p{
    font-family: ${fonts.hind} !important;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  img {
    width: 100%;
    height: auto;
  }

  .ui {
    font-family: ${fonts.hind} !important;
  }
`;

export default GlobalCSS;
