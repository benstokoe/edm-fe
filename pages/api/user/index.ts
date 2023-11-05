import users from "@/mock-data/users";
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (!user || password !== user?.password) {
      res.status(500).json({ error: "username or password incorrect" });

      return;
    }

    res
      .status(200)
      .json({ error: false, user: { username: username, role: user.role } });
  } catch (error: any) {
    res.status(400).end(error.message);
  }
}
