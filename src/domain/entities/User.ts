export interface UserDTO {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  public id: string;
  public email: string;
  public name: string;
  public createdAt: Date;
  public updatedAt: Date;

  constructor({ id, email, name, createdAt, updatedAt }: UserDTO) {
    this.id = id;
    this.email = email;
    this.name = name;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  toDTO(): UserDTO {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}