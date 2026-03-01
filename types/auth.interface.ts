import { IUser } from "./user.interface";

export interface IAuthForm {
  email: string;
}

export interface IAuthLoginResponse {
  message: string;
}

export interface IAuthResponse {
  user: IUser;
  accessToken: string;
}
