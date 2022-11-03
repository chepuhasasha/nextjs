import mongoose from "mongoose";


function getURI() {
  return `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/admin`;
}
console.log(getURI())
const URI =
  process.env.NODE_ENV == "development"
    ? process.env.MONGO_DEV_URI
    : getURI();
if (!URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"');
}
const connectMongo = async () => mongoose.connect(URI);

export default connectMongo;
