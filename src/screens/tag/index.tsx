import React from "react";
import Link from "next/link";
import { Layout, Tags } from "@components";
import { theme } from "@styles";
import { TitlePosts, Twitter } from "../blog/components";
import {
  TagTitlePostsCSS,
  MaxWidthContainerCSS,
  SideCSS,
  BlogCSS,
} from "./styles";

const TagTitlePosts = (props: any) => {
  const { colors } = theme;
  const { post, main = false, sidePosts = [], tags } = props;
  const { featureImage, title, excerpt, publishedAt, slug, error } = post;

  return (
    <Layout
      title={post.title}
      navColor={colors.gray600}
      mobileNavColor={colors.gray600}
      description={excerpt}
      type="article"
      image={featureImage}
      keywords={tags.map((x) => x.name ?? "")}
    >
      <BlogCSS>
        <MaxWidthContainerCSS>
          <TagTitlePostsCSS>
            {post.map((x, i) => (
              <Link href={`/blog/${x.slug}`} key={i}>
                <a>
                  <li>{x.title}</li>
                </a>
              </Link>
            ))}
          </TagTitlePostsCSS>
          <SideCSS>
            <TitlePosts posts={sidePosts} />
            <Tags tags={tags} />
            <Twitter />
          </SideCSS>
        </MaxWidthContainerCSS>
      </BlogCSS>
    </Layout>
  );
};

export default TagTitlePosts;
