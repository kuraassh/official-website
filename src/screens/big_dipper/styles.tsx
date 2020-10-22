import styled from "styled-components";
import { theme } from "@styles";
const { colors } = theme;
export const BigDipperCSS = styled.span`
  a.active {
    color: white;
    div {
      color: white;
    }
  }

  .displayBackground {
    a.active {
      color: ${() => colors.forboleRed};
      div {
        color: ${() => colors.forboleRed};
      }
    }
  }
`;
