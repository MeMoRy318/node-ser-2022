"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const api_errors_1 = require("../errors/api.errors");
const User_module_1 = require("../models/User.module");
class UserMiddleware {
    async getByIdAndThrow(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User_module_1.User.findById(userId);
            if (!user)
                throw new api_errors_1.ApiErrors("user not found", 404);
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async getAll(req, res, next) {
        try {
            const users = await User_module_1.User.find();
            if (!users)
                throw new api_errors_1.ApiErrors("not found", 404);
            next();
        }
        catch (e) {
            next(e);
        }
    }
    async create(req, res, next) {
        try {
            const user = req.body;
            if (user?.name && user?.email && user?.gender && user?.password) {
                next();
            }
            else {
                throw new api_errors_1.ApiErrors("bad request", 400);
            }
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await User_module_1.User.findById(userId);
            if (user?.name && user?.email && user?.gender && user?.password) {
                next();
            }
            else {
                throw new api_errors_1.ApiErrors("user not found", 404);
            }
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
