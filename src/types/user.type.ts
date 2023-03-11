export enum EGender {
  male = "male",
  female = "female",
}

export interface IUser {
  name: string;
  email: string;
  password: string;
  gender: string;
}
