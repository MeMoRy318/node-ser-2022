export enum EGender {
  male = "male",
  female = "female",
  mixed = "mixed",
}
export interface IUser {
  name: string;
  password: string;
  email: string;
  gender: string;
}
