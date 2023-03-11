import { model, Schema } from "mongoose";

import { EGender } from "../types/user.type";

const userSchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: [true, "email is required"],
      unicode: true,
      lowercase: true,
      trim: true,
    },
    password: { type: String, required: [true, "password is required"] },
    gender: { type: String, enum: EGender, required: true, lowercase: true },
  },
  { versionKey: false }
);

export const User = model("user", userSchema);
