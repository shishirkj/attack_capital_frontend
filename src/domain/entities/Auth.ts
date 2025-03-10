export interface AuthDTO {
  token: string;
  user: {
    _id: string;
    email: string;
    name: string;
  };
}

export class Auth {
  public token: string;
  public user: {
    _id: string;
    email: string;
    name: string;
  };

  constructor({ token, user }: AuthDTO) {
    this.token = token;
    this.user = user;
  }

  toDTO(): AuthDTO {
    return {
      token: this.token,
      user: this.user,
    };
  }
}