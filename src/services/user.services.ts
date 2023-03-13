import { User } from "../models/user.model";
import { IUser } from "../types/user.type";

class UserServices {
  public getAll() {
    return User.find();
  }
  public getById(id: string) {
    return User.findOne({ _id: id });
  }
  public deleteById(id: string) {
    return User.deleteOne({ _id: id });
  }
  public update(id: string, user: IUser) {
    return User.findByIdAndUpdate({ _id: id }, user, { new: true });
  }
  public create(user: IUser) {
    return User.create(user);
  }
}

export const userServices = new UserServices();
