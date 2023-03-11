"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userMiddleware = void 0;
const api_errors_1 = require("../errors/api.errors");
const user_modules_1 = require("../modules/user.modules");
class UserMiddleware {
    async getAll(req, res, next) {
        try {
            const user = await user_modules_1.User.find();
            req.body = user;
            if (!user.length) {
                throw new api_errors_1.ApiErrors("not found users", 404);
            }
            else {
                req.body = user;
                next();
            }
        }
        catch (e) {
            next(e);
        }
    }
    async getById(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await user_modules_1.User.findById(userId);
            if (!user) {
                throw new api_errors_1.ApiErrors("user not found", 404);
            }
            else {
                req.body = user;
                next();
            }
        }
        catch (e) {
            next(e);
        }
    }
    create(req, res, next) {
        try {
            const { name, email, password, gender } = req.body;
            if (name?.length > 2 &&
                email?.length > 2 &&
                password?.length > 2 &&
                gender?.length >= 4) {
                next();
            }
            else {
                throw new api_errors_1.ApiErrors("bed request", 400);
            }
        }
        catch (e) {
            next(e);
        }
    }
    async delete(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await user_modules_1.User.findById(userId);
            if (user) {
                next();
            }
            else {
                throw new api_errors_1.ApiErrors("user not found", 404);
            }
            await user_modules_1.User.deleteOne({ _id: userId });
        }
        catch (e) {
            next(e);
        }
    }
    async update(req, res, next) {
        try {
            const { userId } = req.params;
            const user = await user_modules_1.User.findById(userId);
            const { name, email, password, gender } = req.body;
            if (!user)
                throw new api_errors_1.ApiErrors("user not found", 404);
            if (name?.length > 2 &&
                email?.length > 2 &&
                password?.length > 2 &&
                gender?.length >= 4) {
                next();
            }
            else {
                throw new api_errors_1.ApiErrors("bed request", 400);
            }
        }
        catch (e) {
            next(e);
        }
    }
}
exports.userMiddleware = new UserMiddleware();
