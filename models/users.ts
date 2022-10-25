import { Schema, model, models } from 'mongoose';

export interface IUser {
  username: string
  hash: string
  salt: string
}

export interface IUserDB extends IUser {
  _id: string
}

export const UserSchema = new Schema<IUser>({
  username: {type: String, required: true},
  hash: {type: String, required: true, unique: true},
  salt: {type: String, required: true, unique: true}
});

export const Users = models.Users || model('Users', UserSchema);
