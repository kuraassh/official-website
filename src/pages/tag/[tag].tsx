//import BlogDetails from "@screens/blog_details";
import TagTitlePosts from "@screens/tag";
import { getPostsByTag } from "@api/tags";
// import posts from "@api/tags";
import { Post } from "@models";
import { removeInternalTags } from "@utils/remove_internal_tags";

const TagDetailsPage = (props: any) => {
  return <TagTitlePosts {...props} />;
};

TagDetailsPage.getInitialProps = async ({ query }) => {
  // console.log(query);
  // let formattedSidePosts = [];
  // let formattedTags = [];
  // let meta = {};
  // let error = false;
  const { tag } = query;
  const posts = await getPostsByTag(tag);
  const formattedPosts = posts.map((post) => Post.fromJson(post, {}));
  // console.log(posts);
  if (formattedPosts) {
    formattedPosts.tags = posts.map((x) => removeInternalTags(x.tags));
    // console.log(posts);
    const formattedPost = posts.map((y) => Post.fromJson(y, {}));
    // Post.fromJson(posts);
    // console.log({ post: formattedPost });
    return { post: formattedPost };
  } else {
    return { post: null };
  }
};

export default TagDetailsPage;
