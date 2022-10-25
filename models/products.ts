import { Schema, model, models } from 'mongoose';

export interface IProduct {
  title: string
  description: string
  brand_id: string
  tags: string[]
  characteristics: {name: string, value: string}[] 
  model: string
  images: string[]
  preview: string
  price: string
  buy_links: {marketplace: string, link: string}[]
}


export interface IProductDB extends IProduct {
  _id: string
}

export const ProductSchema = new Schema<IProduct>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  brand_id: {type: String, required: true},
  tags: [String],
  characteristics: {name: String, value: String}, 
  model: String,
  images: [String],
  preview: String,
  price: String,
  buy_links: [{marketplace: String, link: String}]
});

export const Products = models.Products || model('Products', ProductSchema);
