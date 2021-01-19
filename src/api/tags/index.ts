import { ghostApi as api } from "../index";
// import { IPost } from "./interface";

/** Get blog posts by tag */
export const getPostsByTag = async (query: string) => {
  try {
    const posts = await api.posts.browse({
      filter: `tags:${query}`,
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
