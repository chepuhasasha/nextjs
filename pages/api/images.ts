import connectMongo from "../../utils/db/mongoose";
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs/promises";
import path from "path";

const secret = process.env.NODE_ENV === "development" ? process.env.NEXT_AUTH_DEV_SECRET : process.env.NEXT_AUTH_SECRET;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await connectMongo();
  switch (req.method) {
    case "POST": {
      const { cookies } = req;

      const jwt = cookies.JWT;

      if (!jwt) {
        return res.status(401).json({ message: "Invalid token!" });
      }

      if (req.body && req.body) {
        const fileName = encodeURI(`/images/${Date.now()}.${req.body.exp}`);
        const imagePath = path.resolve(__dirname, `../../../../public/`);
        await fs.writeFile(imagePath + fileName, req.body.data, "binary");
        return res.status(201).json({ message: `${fileName}`, error: false });
      } else {
        return res.json({ message: "bad request", error: true });
      }
    }

    case "DELETE": {
      await fs.unlink(
        path.resolve(__dirname, `../../../../public/${req.body.name}`)
      );
      return res.json({ name: req.body.name });
    }

    case "GET": {
      const result = await fs.readdir(
        path.resolve(__dirname, "../../../../public/images/"),
        "utf8"
      );
      return res.json(result.map((p) => `/images/${p}`));
    }

    default:
      return res.json({ message: "bad request", error: true });
  }
}
