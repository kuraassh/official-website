import React from "react";
import Link from "next/link";
import { Layout, Tags } from "@components";
import { theme } from "@styles";
import { BlogPosts, TitlePosts, Twitter } from "../blog/components";
import { TagTitlePostsCSS, MaxWidthContainerCSS, SideCSS } from "./styles";

const TagTitlePosts = (props: any) => {
  //console.log(props);
  // const { posts } = props;
  const { colors } = theme;
  const { post, main = false } = props;
  const { featureImage, title, excerpt, publishedAt, slug, tags } = post;

  // props = posts;
  // console.log(post[0]);
  return (
    <Layout
      title={post.title}
      navColor={colors.gray600}
      mobileNavColor={colors.gray600}
      description={excerpt}
      type="article"
      image={featureImage}
      // keywords={tags.map((x) => x.name ?? "")}
    >
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
          {/* <BlogPosts /> */}
          <TitlePosts posts={post} />
          <Tags tags={tags} />
          <Twitter />
        </SideCSS>
      </MaxWidthContainerCSS>
    </Layout>
  );
};

export default TagTitlePosts;
