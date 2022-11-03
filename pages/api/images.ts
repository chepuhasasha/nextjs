import connectMongo from "../../utils/db/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";
import { Users } from "../../models/users";
import { verify } from "jsonwebtoken";

const secret =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_AUTH_DEV_SECRET
    : process.env.NEXT_AUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();
  const { cookies } = req;

  const jwt = cookies.JWT;

  if (!jwt) {
    return res.status(401).json({ message: "Invalid token!" });
  }

  const payload = verify(jwt, secret);
  const user = await Users.findOne({ username: payload.username });
  if (!user) {
    return res.status(401).json({ message: "..." });
  }
  switch (req.method) {
    case "POST": {
      if (req.body) {
        const fileName = encodeURI(`/images/${Date.now()}.${req.body.exp}`);
        const imagePath = path.resolve(__dirname, `../../../../public/`);
        await fs.writeFile(imagePath + fileName, req.body.data, "binary");
        return res.status(201).json({ message: `${fileName}`, error: false });
      } else {
        return res.json({ message: "bad request", error: true });
      }
    }

    case "DELETE": {
      if (req.body) {
        await fs
          .unlink(
            path.resolve(__dirname, `../../../../public/${req.body.name}`)
          )
          .then(() => res.json({ name: req.body.name }))
          .catch((error) => res.json({ error: true, message: error.message }));
      }
      return res.json({ message: "bad request", error: true });
    }

    case "GET": {
      await fs
        .readdir(path.resolve(__dirname, "../../../../public/images/"), "utf8")
        .then((result) => res.json(result.map((p) => `/images/${p}`)))
        .catch((error) => res.json({ error: true, message: error.message }));
      return res.json({ message: "bad request", error: true });
    }

    default:
      return res.json({ message: "bad request", error: true });
  }
}
