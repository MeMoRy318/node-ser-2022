import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "./models/User.module";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5200;

app.listen(PORT, async () => {
  console.log(`server listen ${PORT}`);
  await mongoose.connect("mongodb://127.0.0.1:27017/sep-2022");
});

app.get("/users", async (req: Request, res: Response) => {
  const users = await User.find();
  res.status(200).json(users);
});

app.post("/users", async (req: Request, res: Response) => {
  const user = await req.body;
  await User.create(user);
  res.status(201).json(user);
});

app.get("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.status(200).json(user);
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  const user = req.body;
  const { userId } = req.params;
  await User.updateOne({ _id: userId }, user);
  res.status(201).json(user);
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    console.log(userId);
    await User.deleteOne({ _id: userId });
    res.sendStatus(204);
  } catch (e) {
    console.log(e.message);
    res.sendStatus(204);
  }
});
