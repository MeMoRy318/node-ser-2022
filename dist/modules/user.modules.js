"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_type_1 = require("../types/user.type");
const userSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: {
        type: String,
        required: [true, "email is required"],
        unicode: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: [true, "password is required"] },
    gender: { type: String, enum: user_type_1.EGender, required: true, lowercase: true },
}, { versionKey: false });
exports.User = (0, mongoose_1.model)("user", userSchema);
