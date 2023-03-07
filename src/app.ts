import express, { Request, Response } from "express";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5200;

app.listen(PORT, (): void => {
  mongoose.connect("mongodb://127.0.0.1:27017/sep-2022");

  console.log(`server start ${PORT}`);
});

app.get("/users", async (req: Request, res: Response) => {
  res.json({ name: "users" });
});
