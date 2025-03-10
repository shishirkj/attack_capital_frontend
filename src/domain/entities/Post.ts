export interface PostDTO {
  _id: string;
  title: string;
  content: string;
  author_id: string;
  authorName: string;
  createdAt: Date;
  updatedAt?: Date;
}

export class Post {
  public _id: string;
  public title: string;
  public content: string;
  public author_id: string;
  public authorName: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({ _id, title, content, author_id, authorName, createdAt, updatedAt }: PostDTO) {
    this._id = _id;
    this.title = title;
    this.content = content;
    this.author_id = author_id;
    this.authorName = authorName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt??new Date();
  }

  toDTO(): PostDTO {
    return {
      _id: this._id,
      title: this.title,
      content: this.content,
      author_id: this.author_id,
      authorName: this.authorName,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}