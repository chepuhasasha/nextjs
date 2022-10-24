import { Schema, model, models, ObjectId } from 'mongoose';
import { Local } from '../dto/local.interface';

export interface IBrand {
  title: string
  description: Local
  logo: string
  baner: string,
  alias: string
}

export interface IBrandBD extends IBrand {
  _id: ObjectId
}

export const BrandSchema = new Schema<IBrand>({
  title: {type: String, required: true},
  description: {type: Object, required: true},
  logo: {type: String, required: true},
  baner: {type: String, required: true},
  alias: {type: String, required: true, unique: true}
});

export const Brands = models.Brands || model('Brands', BrandSchema);
