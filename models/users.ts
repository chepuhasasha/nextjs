import { Schema, model, models } from 'mongoose';

export interface IUser {
  name: string
  username: string
  email: string,
  password: string
  avatar: string
  role: string
}

export interface IUserDB extends IUser {
  _id: string
}

export const UserSchema = new Schema<IUser>({
  name: {type: String, required: true},
  username: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  role: {type: String, required: true, unique: true},
  avatar: {type: String, required: true, unique: true}
});

export const Users = models.Brands || model('Users', UserSchema);
