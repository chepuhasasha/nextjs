import { Schema, model, models } from 'mongoose';

export interface IProduct {
  title: string
  description: string
  brand_id: string
  baner: string
  characteristics: {name: string, value: string}[] 
  images: string[]
  buy_links: {marketplace: string, link: string, price: string}[]
}


export interface IProductDB extends IProduct {
  _id: string
}

export const ProductSchema = new Schema<IProduct>({
  title: {type: String, required: true},
  description: {type: String, required: true},
  brand_id: {type: String, required: true},
  baner: {type: String, required: true},
  characteristics: [{name: String, value: String}], 
  images: [String],
  buy_links: [{marketplace: String, link: String, price: String}]
});

export const Products = models.Products || model('Products', ProductSchema);
