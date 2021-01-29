import styled from "styled-components";
import { generateBackgroundColor } from "./config";

export const TagsCSS = styled.div<any>`
  h3 {
    font-weight: 500;
    margin-bottom: 1rem;
  }

  ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    a {
      color: white;
      &:hover {
        color: rgba(255, 255, 255);
      }
    }
  }
`;

export const ListCSS = styled.li<any>`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${(props) => generateBackgroundColor(props.index)};
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  &:hover {
    opacity: 0.5;
  }
  a {
    color: white;
  }
`;
