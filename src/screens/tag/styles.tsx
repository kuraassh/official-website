import styled from "styled-components";
import { MaxWidthContainerCSS as MaxWidthCSS } from "@styles/components";
import { mixins, theme, media } from "@styles";

const { colors } = theme;

export const MaxWidthContainerCSS = styled(MaxWidthCSS)`
  width: 100%;

  ${media.bigDesktop`
    ${mixins.mobileHorizontalPadding}
    ${mixins.mobileBottomPadding}
    margin-top: 7.5rem;
    display: flex;
    max-width: 900px;
  `}
`;

export const TagTitlePostsCSS = styled.ul`
  span {
    display: flex;
    align-items: center;
    h4 {
      font-weight: 400;
      margin-bottom: 0.1rem;
      color: ${colors.gray400};
    }
    img {
      margin-right: 0.3rem;
      border-radius: 50%;
      width: 25px;
      height: 25px;
      min-height: 0px;
      object-fit: cover;
    }
  }
  ${mixins.mobilePadding}
  padding: 2.5rem 1.5rem 3.5rem;
  padding-top: 5rem;
  list-style-type: none;

  a {
    color: black;
  }

  li {
    padding: 0.7rem 0.5rem;
    border-bottom: 1px solid ${colors.gray100};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  ${media.bigDesktop`
    width: 100%;
    border: 1px solid ${colors.gray100};
    padding: 0;

    li {
      padding: 1rem 1.5rem;
      transition: 0.2s;
      &:hover {
        cursor: pointer;
        background: #f5f7fa;
      }

      &:last-child {
        border: none;
      }
    }
  `}
`;

export const SideCSS = styled.div`
  .tags-container {
    ${mixins.mobilePadding}
    padding-top: 1.5rem;
  }

  ${media.bigDesktop`
    width: 30%;
    min-width: 300px;
    margin-left: 2rem;

    .tags-container {
      margin-top: 2rem;
      border: solid 1px ${colors.gray100};
    }
  `}
`;

export const BlogCSS = styled.div`
  ${media.bigDesktop`
    ${mixins.flexCenter}
  `}
`;
