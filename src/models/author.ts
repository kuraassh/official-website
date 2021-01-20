class Author {
  public bio: string;
  public name: string;
  public profileImage: string;
  public slug: string;

  constructor(payload: any) {
    this.bio = payload.bio;
    this.name = payload.name;
    this.profileImage = payload.profileImage;
    this.slug = payload.slug;
  }

  static fromJson(data: any) {
    return new Author({
      bio: data.bio,
      name: data.name,
      profileImage: data["profile_image"],
      slug: data.slug,
    });
  }
}

export default Author;
