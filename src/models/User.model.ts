import { model, Schema } from "mongoose";

import { EGenders } from "../types/user.types";

const userShema = new Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "email is required"],
    trim: true,
    lowerCase: true,
  },
  password: {
    type: String,
    required: [true, "password is required"],
  },
  gender: {
    type: String,
    enum: EGenders,
  },
});

export const user = model("user", userShema);
