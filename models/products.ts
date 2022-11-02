import { Schema, model, models } from 'mongoose';

export interface IProduct {
  title: string
  description: string
  brand_id: string
  baner: string
  characteristics: Record<string, string>
  images: string[]
  buy_links: Record<string, string>
}

export interface IProductDB extends IProduct {
  _id: string
}

export const ProductSchema = new Schema<IProduct>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  brand_id: {type: String, required: true},
  baner: {type: String, required: true},
  characteristics: {type: Object, required: true}, 
  images: {type: [String], required: true},
  buy_links: {type: Object, required: true},
});

export const Products = models.Products || model('Products', ProductSchema);
