import { NextFunction, Request, Response } from "express";

import { User } from "../modules/user.modules";
import { IMessage } from "../types/message.type";
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
  public getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Response<IUser> {
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
  ): Promise<Response<IMessage<IUser>>> {
    try {
      await User.create(req.body);
      return res.status(201).json({ message: "user create", data: req.body });
    } catch (e) {
      next(e);
    }
  }
  public async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<void>> {
    try {
      const { userId } = req.params;

      await User.deleteOne({ _id: userId });

      return res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async upadate(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response<IMessage<IUser>>> {
    try {
      const { userId } = req.params;
      const user = req.body;
      await User.updateOne({ _id: userId }, user);
      return res.status(201).json({ message: "user update", data: user });
    } catch (e) {
      next(e);
    }
  }
}

export const userControllers = new UserControllers();
