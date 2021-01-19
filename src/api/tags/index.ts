// import axios from "axios";
import { ghostApi as api } from "../index";
// import { IPost } from "./interface";
// import { tags } from "@tryghost/helpers";

/** Get blog posts by tag */
export const getPostsByTag = async (
  query: string
  // {
  //   limit = 5,
  //   page = 1,
  //   // filter = "tag:-[hash-zhs,hash-zht]",
  //   filter = `tags:${query}`,
  // }: IPost
) => {
  try {
    const posts = await api.posts.browse({
      filter: `tags:${query}`,
      include: "tags,authors",
      limit: 5,
      page: 1,
      formats: "html",
    });
    // console.log("tag >>>>>>>>>", posts);
    return posts ?? null;
    // return await api.posts.browse({
    //   include: "tags,authors",
    //   limit,
    //   page,
    //   filter,
    //   formats: "html",
    // });
  } catch (err) {
    console.error(`tag: ${err}`);
    return [];
  }
};
