import mongoose from "mongoose";

const URI = process.env.NODE_ENV == "development" ? process.env.MONGO_DEV_URI : process.env.MONGO_URI;


if (!URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}
const connectMongo = async () => mongoose.connect(URI);

export default connectMongo;
