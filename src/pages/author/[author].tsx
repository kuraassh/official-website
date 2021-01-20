import AuthorTitlePosts from "@screens/author";
import { getPostsByAuthor, getAuthorBySlug } from "@api/authors";
import { getPosts, getTags } from "@api/posts";
import { Post, Tag } from "@models";
import { removeInternalTags } from "@utils/remove_internal_tags";

const AuthorDetailsPage = (props: any) => {
  return <AuthorTitlePosts {...props} />;
};

AuthorDetailsPage.getInitialProps = async ({ query }) => {
  const { author } = query;
  const posts = await getPostsByAuthor(author);
  const authorInfo = await getAuthorBySlug(author);

  let authorPosts = [];
  let formattedSidePosts = [];
  let formattedTags = [];
  let meta = {};
  let error = false;
  try {
    const fetchQuery: any = {};
    if (query.page) {
      fetchQuery.page = query.page;
    }
    const [tags, sidePosts] = await Promise.all([
      getTags(),
      getPosts({
        limit: 10,
      }),
    ]);
    formattedSidePosts = sidePosts.map((post) => Post.fromJson(post, {}));
    formattedTags = removeInternalTags(tags).map((tag) => Tag.fromJson(tag));
    meta = posts?.meta;
    authorPosts = posts.map((y) => Post.fromJson(y, {}));
  } catch (err) {
    error = true;
    console.log(error, "error");
  }

  return {
    author: authorInfo,
    post: authorPosts,
    tags: formattedTags,
    sidePosts: formattedSidePosts,
    meta,
    error,
  };
};

export default AuthorDetailsPage;
