import { useRouter } from "next/router";

export const useBlogPostsHook = () => {
  const router: any = useRouter();

  const handleAuthorPageChange = (e: any, { activePage }: any) => {
    router.push({
      pathname: `/author/${router.query.author}`,
      query: { page: activePage },
    });
  };

  return {
    handleAuthorPageChange,
  };
};
