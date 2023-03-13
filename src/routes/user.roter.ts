import { Router } from "express";

import { userControllers } from "../controllers/userControllers";
import { userMiddleware } from "../middleware/user.middleware";

const router = Router();

router.get("/", userMiddleware.getAll, userControllers.getAll);
router.post("/", userMiddleware.create, userControllers.create);
router.patch("/:userId", userMiddleware.isObjectIdsValid);

export const userRouter = router;
