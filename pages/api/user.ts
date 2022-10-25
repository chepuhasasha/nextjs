import connectMongo from "../../utils/db/mongoose";
import { Users } from "../../models/users";
import { verify } from "jsonwebtoken";

const secret = process.env.NEXTAUTH_SECRET;

export default async function handler(req, res) {
  await connectMongo();
  switch (req.method) {
    case "GET": {
      const { cookies } = req;

      const jwt = cookies.JWT;

      if (!jwt) {
        return res.status(401).json({ message: "Invalid token!" });
      }

      const payload = verify(jwt, secret);
      const user = await Users.findOne({ username: payload.username });
      res.json(user);
      break;
    }

    default:
      break;
  }
}
