import { NextFunction, Request, Response } from "express";

import { ApiErrors } from "../errors/api.errors";
import { User } from "../models/User.module";

class UserMiddleware {
  public async getByIdAndThrow(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) throw new ApiErrors("user not found", 404);
      next();
    } catch (e) {
      next(e);
    }
  }

  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await User.find();
      if (!users) throw new ApiErrors("not found", 404);
      next();
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = req.body;
      if (user?.name && user?.email && user?.gender && user?.password) {
        next();
      } else {
        throw new ApiErrors("bad request", 400);
      }
    } catch (e) {
      next(e);
    }
  }
  public async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (user?.name && user?.email && user?.gender && user?.password) {
        next();
      } else {
        throw new ApiErrors("user not found", 404);
      }
    } catch (e) {
      next(e);
    }
  }
}
export const userMiddleware = new UserMiddleware();
