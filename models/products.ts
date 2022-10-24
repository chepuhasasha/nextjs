import { Schema, model, models, ObjectId } from 'mongoose';
import { ILocal, LocalSchema } from './local';

export interface IProduct {
  title: ILocal
  description: ILocal
  brand_id: string
  tags: string[]
  characteristics: {name: ILocal, value: ILocal}[] 
  model: string
  images: string[]
  preview: string
  price: ILocal
  buy_links: {marketplace: string, link: string}[]
}


export interface IProductBD extends IProduct {
  _id: string
}

export const ProductSchema = new Schema<IProduct>({
  title: LocalSchema,
  description: LocalSchema,
  brand_id: String,
  tags: [String],
  characteristics: {name: LocalSchema, value: LocalSchema}, 
  model: String,
  images: [String],
  preview: String,
  price: LocalSchema,
  buy_links: [{marketplace: String, link: String}]
});

export const Products = models.Products || model('Products', ProductSchema);
