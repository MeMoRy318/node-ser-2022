import { Router } from "express";

import { userControllers } from "../controllers/user.controllers";
import { userMiddleware } from "../middleware/user.middleware";

const router = Router();

router.get("/", userMiddleware.getAll, userControllers.getAll);

router.post("/", userMiddleware.create, userControllers.create);

router.get("/:userId", userMiddleware.getByIdAndThrow, userControllers.getById);

router.put("/:userId", userMiddleware.update, userControllers.update);

router.delete("/:userId", userControllers.delete);

export const userRouter = router;
