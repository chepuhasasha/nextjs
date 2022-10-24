import { DBID } from "./id.type"
import { Local } from "./local.interface"

export interface Brand {
  title: string
  description: Local
  logo: string
  baner: string
}

export interface BrandDB extends Brand {
  _id: DBID
}