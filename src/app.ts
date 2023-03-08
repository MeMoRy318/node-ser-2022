import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "./models/User.module";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5100;

app.listen(PORT, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sep-2022");
  console.log(`server listen ${PORT}`);
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  try {
    const body = req.body;
    const user = await User.create({ ...body });
    res.status(201).json({ data: user });
  } catch (e) {
    res.json({ message: e.message });
  }
});

app.get("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById({ userId });
  res.json(user);
});
