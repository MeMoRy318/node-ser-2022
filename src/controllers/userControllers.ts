import { NextFunction, Request, Response } from "express";

import { User } from "../models/user.model";
import { userServices } from "../services/user.services";
import { IUser } from "../types/user.type";

class UserControllers {
  public getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<IUser[]> {
    try {
      return res.status(200).json(req.body);
    } catch (e) {
      next(e);
    }
  }

  public async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IUser>> {
    try {
      await userServices.create(req.body);
      return res.status(201).json({ ...req.body, password: "*********" });
    } catch (e) {
      next(e);
    }
  }
}

export const userControllers = new UserControllers();
