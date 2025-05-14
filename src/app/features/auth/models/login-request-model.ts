export interface LoginRequestModel {
    email: string;
    password: string;
    [key: string]: string | boolean | undefined;
  }