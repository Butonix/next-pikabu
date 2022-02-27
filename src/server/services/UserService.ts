import { UserDocument } from "@shared/types/documents";
import { UserModel } from "../models/user.model";

class UserService {
  async create(user: UserDocument) {
    const createdUser = await UserModel.create(user);
    return createdUser;
  }

  async findByEmail(email: string) {
    const foundUser = await UserModel.findOne({ email });
    return foundUser;
  }
  async getOneById(id: string) {
    if (!id) {
      throw new Error("не указан ID");
    }
    const user = await UserModel.findById(id);
    return user;
  }
  async getOneByName(name: string) {
    if (!name) {
      throw new Error("не указан name");
    }
    const user = await UserModel.findOne({ name });
    return user;
  }
}

export default new UserService();
