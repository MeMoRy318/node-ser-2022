"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const user_controllers_1 = require("../controllers/user.controllers");
const user_middleware_1 = require("../middleware/user.middleware");
const router = (0, express_1.Router)();
router.get("/", user_middleware_1.userMiddleware.getAll, user_controllers_1.userControllers.getAll);
router.post("/", user_middleware_1.userMiddleware.create, user_controllers_1.userControllers.create);
router.get("/:userId", user_middleware_1.userMiddleware.getByIdAndThrow, user_controllers_1.userControllers.getById);
router.put("/:userId", user_middleware_1.userMiddleware.update, user_controllers_1.userControllers.update);
router.delete("/:userId", user_controllers_1.userControllers.delete);
exports.userRouter = router;
