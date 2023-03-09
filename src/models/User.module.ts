import { model, Schema } from "mongoose";

import { EGender } from "../types/user.types";

const userSchema = new Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    gender: {
      type: String,
      enum: EGender,
    },
  },
  { versionKey: false }
);

export const User = model("user", userSchema);
