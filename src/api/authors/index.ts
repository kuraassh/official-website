import { ghostApi as api } from "../index";
// import { IPost } from "./interface";

/** Get blog posts by tag */
export const getAuthorBySlug = async (query: string) => {
  try {
    const authorInfo = await api.authors.read({
      slug: `${query}`,
    });
    return authorInfo ?? null;
  } catch (err) {
    console.error(`tag: ${err}`);
    return [];
  }
};

/** Get blog posts by author */
export const getPostsByAuthor = async (query: string) => {
  try {
    const posts = await api.posts.browse({
      filter: `author:${query}`,
      include: "tags,authors",
      limit: 5,
      page: 1,
      formats: "html",
    });
    return posts ?? null;
  } catch (err) {
    console.error(`tag: ${err}`);
    return [];
  }
};
