"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const user_types_1 = require("../types/user.types");
const userSchema = new mongoose_1.Schema({
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
        enum: user_types_1.EGender,
    },
}, { versionKey: false });
exports.User = (0, mongoose_1.model)("user", userSchema);
