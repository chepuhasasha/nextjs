import { IUser, Users } from "../../../models/users";
import connectMongo from "../../../utils/db/mongoose";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import crypto from "crypto";

const secret = process.env.NODE_ENV === "development" ? process.env.NEXT_AUTH_DEV_SECRET : process.env.NEXT_AUTH_SECRET;

export function validatePassword(user: IUser, inputPassword) {
  const inputHash = crypto
    .pbkdf2Sync(inputPassword, user.salt, 1000, 64, "sha512")
    .toString("hex");
  const passwordsMatch = user.hash === inputHash;
  return passwordsMatch;
}

export default async function handler(req, res) {
  await connectMongo();
  switch (req.method) {
    case "POST": {
      const user = await Users.findOne({ username: req.body?.username });

      if (!user) {
        res.status(404);
        return;
      }
      

      const isValid = validatePassword(user, req.body?.password);

      if (isValid) {
        const token = sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
            username: user.username,
          },
          secret
        );

        const serialized = serialize("JWT", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV !== "development",
          sameSite: "strict",
          maxAge: 60 * 60 * 24 * 30,
          path: "/",
        });
        res.setHeader("Set-Cookie", serialized);
        res.status(200).json({ message: "Succes!" });
      } else {
        res.status(401).json({ err: "Not auth" });
      }

      break;
    }

    default:
      break;
  }
}
