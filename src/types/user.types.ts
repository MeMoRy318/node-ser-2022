export enum EGender {
  male = "male",
  female = "female",
  mixed = "mixed",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  gender: string;
}

export interface ICommentResponse<T> {
  message: string;
  data?: T;
}
