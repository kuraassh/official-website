import styled from "styled-components";
import { mixins, media } from "@styles";

export const CarouselCSS = styled.div`
  display: none;
  ${media.bigDesktop`
   ${mixins.desktopPadding}
   display: flex;
   justify-content: center;
   align-items: center;

  //  .react-multi-carousel-item--active {
  //     // background: red;

  //     &:first-child {
  //       background: green;
  //   }

  //   &:last-child {
  //       background: yellow;
  //   }
  //  }

  .container {
    // padding: 1rem;
    // background: yellow;
  }
  `}
`;


export const TestCSS = styled.span`
  position: absolute;

  svg {
    width: 35px;
    path {
      // fill: blue;
    }
  }

  &.right {
    right: 0;
  }

  &.left {
    left: 0;
  }
`;
