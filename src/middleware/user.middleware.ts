import { NextFunction, Request, Response } from "express";

import { ApiErrors } from "../errors/api.errors";
import { User } from "../modules/user.modules";

class UserMiddleware {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const user = await User.find();
      req.body = user;

      if (!user.length) {
        throw new ApiErrors("not found users", 404);
      } else {
        req.body = user;
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  public async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (!user) {
        throw new ApiErrors("user not found", 404);
      } else {
        req.body = user;
        next();
      }
    } catch (e) {
      next(e);
    }
  }

  public create(req: Request, res: Response, next: NextFunction): void {
    try {
      const { name, email, password, gender } = req.body;
      if (
        name?.length > 2 &&
        email?.length > 2 &&
        password?.length > 2 &&
        gender?.length >= 4
      ) {
        next();
      } else {
        throw new ApiErrors("bed request", 400);
      }
    } catch (e) {
      next(e);
    }
  }

  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      if (user) {
        next();
      } else {
        throw new ApiErrors("user not found", 404);
      }
      await User.deleteOne({ _id: userId });
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
      const { name, email, password, gender } = req.body;
      if (!user) throw new ApiErrors("user not found", 404);
      if (
        name?.length > 2 &&
        email?.length > 2 &&
        password?.length > 2 &&
        gender?.length >= 4
      ) {
        next();
      } else {
        throw new ApiErrors("bed request", 400);
      }
    } catch (e) {
      next(e);
    }
  }
}

export const userMiddleware = new UserMiddleware();
