import { Schema, model, models } from 'mongoose';

export interface IProductsList {
  title: string
  description: string
  products: string[]
}

export interface IProductsListDB extends IProductsList {
  _id: string
}

export const ProductsListSchema = new Schema<IProductsList>({
  title: String, 
  description: String,
  products: {type: [String], required: true},
});

export const ProductsLists = models.ProductsLists || model('ProductsLists', ProductsListSchema);
