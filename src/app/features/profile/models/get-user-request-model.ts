export interface GetUserRequestModel {
    userId: string;
    userName: string;
    [key: string]: string | boolean | undefined;
  }