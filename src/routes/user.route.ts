import { Router } from "express";

import { userControllers } from "../controllers/user.controllers";
import { userMiddleware } from "../middleware/user.middleware";

const router = Router();

router.get("/", userMiddleware.getAll, userControllers.getAll);

router.get("/:userId", userMiddleware.getById, userControllers.getById);

router.post("/", userMiddleware.create, userControllers.create);

router.delete("/:userId", userMiddleware.delete, userControllers.delete);

router.put("/:userId", userMiddleware.update, userControllers.upadate);

export const userRoute = router;
