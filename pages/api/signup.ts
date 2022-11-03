import { IUser, Users } from "../../models/users";
import connectMongo from "../../utils/db/mongoose";
import crypto from "crypto";

const secret =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_AUTH_DEV_SECRET
    : process.env.NEXT_AUTH_SECRET;

export async function createUser({ username, password }): Promise<IUser> {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto
    .pbkdf2Sync(password, salt, 1000, 64, "sha512")
    .toString("hex");

  return {
    username,
    hash,
    salt,
  };
}

export default async function handler(req, res) {
  await connectMongo();
  switch (req.method) {
    case "POST": {
      if (req.body && req.body.key && req.body.key === secret) {
        delete req.body.key;
        const user = await createUser(req.body);
        const newUser = await Users.create(user);
        res.status(200).send({ done: true, user: newUser });
      } else {
        return res.status(401).json({ message: "bad request", error: true });
      }
      break;
    }

    default:
      break;
  }
}
