import { UserModel, UserDocument } from '../models/user';

export const findOneUserAndUpdate = (
  query: any,
  update: any,
  options?: any,
): Promise<User> => UserModel.findOneAndUpdate(
  query,
  update,
  options,
) as unknown as Promise<User>;

export type User = UserDocument;