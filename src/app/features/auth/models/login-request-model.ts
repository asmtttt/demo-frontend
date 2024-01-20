export interface LoginModel {
    username: string;
    password: string;
    [key: string]: string | boolean | undefined;
  }