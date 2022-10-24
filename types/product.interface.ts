import { BrandDB } from "./brand.interface"
import { DBID } from "./id.type"
import { Local } from "./local.interface"

export interface Product {
  title: Local
  description: Local
  brand_id: BrandDB['_id']
  tags: string[]
  characteristics: {name: Local, value: Local}[] 
  model: Record<string, unknown>
  images: string[]
  preview: string
  price: Local
  buy_links: {marketplace: string, link: string}[]
}

export interface ProductDB extends Product {
  _id: DBID
}