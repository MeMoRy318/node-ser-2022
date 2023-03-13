import Joi from "joi";

import { regexConstants } from "../constants/regexConstants";
import { EGender } from "../types/user.type";

export class UserValidator {
  private static firstName = Joi.string().min(2).max(50).trim();
  private static email = Joi.string().regex(regexConstants.EMAIL).trim();
  private static password = Joi.string().regex(regexConstants.PASSWORD).trim();
  private static gender = Joi.valid(...Object.values(EGender));

  static createUser = Joi.object({
    name: this.firstName.required(),
    email: this.email.required(),
    password: this.password.required(),
    gender: this.gender.required(),
  });

  static updateUser = Joi.object({
    name: this.firstName,
    gender: this.gender,
    email: this.email,
    password: this.password,
  });
}
 