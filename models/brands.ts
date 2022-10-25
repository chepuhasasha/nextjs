import { Schema, model, models } from 'mongoose';

export interface IBrand {
  title: string
  description: string
  logo: string
  baner: string,
  alias: string
}

export interface IBrandDB extends IBrand {
  _id: string
}

export const BrandSchema = new Schema<IBrand>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  logo: {type: String, required: true},
  baner: {type: String, required: true},
  alias: {type: String, required: true, unique: true}
});

export const Brands = models.Brands || model('Brands', BrandSchema);
