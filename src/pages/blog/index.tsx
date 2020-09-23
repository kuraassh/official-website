import Blog from "@screens/blog";
import { getPosts, getTags } from "@api/posts";
import { Post, Tag } from "@models";
import { filterInternalTags } from "@utils/filter_internal_tags";
function BlogPage(props: any) {
  return <Blog {...props} />;
}

BlogPage.getInitialProps = async ({ query }) => {
  const fetchQuery: any = {};
  if (query.page) {
    fetchQuery.page = query.page;
  }

  const [tags, posts] = await Promise.all([getTags(), getPosts(fetchQuery)]);

  const formattedPosts = posts.map((post) => Post.fromJson(post));
  const formattedTags = filterInternalTags(tags).map((tag) =>
    Tag.fromJson(tag)
  );

  return { posts: formattedPosts, meta: posts.meta, tags: formattedTags };
};

export default BlogPage;
