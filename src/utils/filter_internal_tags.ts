export const filterInternalTags = (tags: any[]) => {
  return tags.filter((x: any) => {
    return x.visibility !== "internal";
  });
};
