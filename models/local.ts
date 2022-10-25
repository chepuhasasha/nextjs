import { Schema } from 'mongoose';

export interface ILocal {
  ru: string,
  en: string
}

export const LocalSchema = new Schema<ILocal>({
  ru: String,
  en: String
}, { _id: false });
