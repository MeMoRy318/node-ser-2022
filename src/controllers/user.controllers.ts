import { Request, Response } from "express";

import { User } from "../models/User.module";
import { ICommentResponse, IUser } from "../types/user.types";

class UserControllers {
  public async getAll(req: Request, res: Response): Promise<Response<IUser[]>> {
    const users = await User.find();
    return res.status(200).json(users);
  }

  public async getById(req: Request, res: Response): Promise<Response<IUser>> {
    try {
      const { userId } = req.params;
      const user = await User.findById(userId);
      return res.status(200).json(user);
    } catch (e) {
      res.json({ massage: e.massage });
    }
  }

  public async create(
    req: Request,
    res: Response
  ): Promise<Response<ICommentResponse<IUser>>> {
    try {
      const user = req.body;
      await User.create(user);
      return res.status(201).json({ message: "user create", data: user });
    } catch (e) {
      res.json(e.message);
    }
  }

  public async update(
    req: Request,
    res: Response
  ): Promise<Response<ICommentResponse<IUser>>> {
    try {
      const { userId } = req.params;
      await User.updateOne({ _id: userId }, req.body);
      const user = await User.findOne({ _id: userId });
      return res.status(201).json({ message: "user update", data: user });
    } catch (e) {
      res.status(404).json({ message: e.message });
    }
  }

  public async delete(
    req: Request,
    res: Response
  ): Promise<Response<ICommentResponse<IUser>>> {
    const { userId } = req.params;
    await User.deleteOne({ email: userId });
    return res.json({ message: "user delete" });
  }
}
export const userControllers = new UserControllers();
