class Tag {
  public name: string;
  public slug: string;
  public url: string;

  constructor(payload: any) {
    this.name = payload.name;
    this.slug = payload.slug;
    this.url = payload.url;
  }

  static fromJson(data: any) {
    return new Tag({
      name: data.name,
      slug: data.slug ?? data.name,
      url: data.url ?? data.name,
    });
  }
}

export default Tag;
