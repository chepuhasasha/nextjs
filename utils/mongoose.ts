import mongoose from "mongoose";
import { loadEnvConfig } from '@next/env'

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}
const connectMongo = async () => mongoose.connect(process.env.MONGODB_URI);

export default connectMongo;
