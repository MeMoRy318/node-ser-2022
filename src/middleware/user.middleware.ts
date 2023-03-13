import { NextFunction, Request, Response } from "express";
import { isObjectIdOrHexString } from "mongoose";

import { ApiErrors } from "../errors/api.errors";
import { User } from "../models/user.model";
import { userServices } from "../services/user.services";
import { IRequest } from "../types/request.type";
import { UserValidator } from "../validator/user.validator";

class UserMiddleware {
  public async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const users = await userServices.getAll();
      if (!users.length) throw new ApiErrors("Users not found", 422);
      req.body = users;
      next();
    } catch (e) {
      next(e);
    }
  }

  // validator

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { error, value } = UserValidator.createUser.validate(req.body);
      if (error) throw new ApiErrors(error.message, 400);
      req.body = value;
      next();
    } catch (e) {
      next(e);
    }
  }

  public async isObjectIdsValid(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      if (!isObjectIdOrHexString(req.params.userId)) {
        throw new ApiErrors("id not valid", 400);
      }
      next();
    } catch (e) {
      next(e);
    }
  }
  public getDynamicallyAndThrow(
    fieldName: string,
    from = "body",
    dbFiled = fieldName
  ) {
    return async (req: IRequest, res: Response, next: NextFunction) => {
      try {
        const fieldValue = req[from][fieldName];
        const user = await User.findOne({ [dbFiled]: fieldValue });
        if (user) throw new ApiErrors("tes errors", 400);
        next();
      } catch (e) {
        next(e);
      }
    };
  }
}
export const userMiddleware = new UserMiddleware();
