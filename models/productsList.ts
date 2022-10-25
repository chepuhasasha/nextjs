import { Schema, model, models, ObjectId } from 'mongoose';
import { ILocal, LocalSchema } from './local';

export interface IProductsList {
  title: ILocal
  description: ILocal
  products: string[]
}

export interface IProductsListDB extends IProductsList {
  _id: string
}

export const ProductsListSchema = new Schema<IProductsList>({
  title: LocalSchema, 
  description: LocalSchema,
  products: {type: [String], required: true},
});

export const ProductsLists = models.ProductsLists || model('ProductsLists', ProductsListSchema);
