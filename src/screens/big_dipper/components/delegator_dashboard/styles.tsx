import styled from "styled-components";
import { mixins, theme, media } from "@styles";

const { colors } = theme;

export const DashboardContentCSS = styled.div`
  ${mixins.mobileLastContainerPadding}
  ${mixins.flexCenter}
  color: ${colors.black};
  display: flex;
  flex-direction: column;
  width: 100%;
  .image {
      padding: 1rem;
  }
  img {
    border-radius: 0.5rem;
    -webkit-filter: drop-shadow(1rem 1rem 2rem rgba(0, 0, 0, 0.2));
    filter: drop-shadow(1rem 1rem 2rem rgba(0, 0, 0, 0.2));
    margin-bottom: 2.5rem;
  }
  h3, p {
      font-weight: 100;
      margin-bottom: 0.5rem;
  }
  h3 {
      font-size: 1.4rem;
  }
  h2 {
      font-size: 1.6rem;
      font-weight: 500;
      margin-bottom: 0.5rem;
      min-height: 2rem;
  }
  .ui.black.button {
    font-weight: 100;
    margin-top: 0.5rem;
  }
  a {
    color: ${colors.white};
  }
  ${media.tablet`
    .image {
      padding: 2rem;
    }
    h3 {
      font-size: 2rem;
    }
    h2 {
      font-size: 3rem;
    }
    p {
      font-size: 1.7rem;
    }
  `}
  ${media.bigDesktop`
    min-height: 25rem;
    ${mixins.flexCenter}
    padding: 8rem 5rem 8rem;
    .desktopWrapper {
      ${mixins.desktopMaxWidth}
      ${mixins.flexBetween}
      flex-direction: row-reverse;
      width: 100%;
      display: flex;
    }
    h3 {
      font-size: 2rem;
    }
    h2 {
      font-size: 3rem;
    }
    p {
      display: flex;
      justify-content: flex-start;
      width: 100%;
      font-weight: 100;
      font-size: 1rem;
    }
    img {
      display: flex;
      justify-content: flex-end;
      margin-bottom: 0;
    }
    .image {
      padding: 0;
    }
    .content {
      width: 65%;
    }
    .ui.black.button:hover {
      background-color: ${colors.red};
    }
    .ui.black.button:focus {
      background-color: rgba(240, 57, 57, 1);
    }
  `}
`;
