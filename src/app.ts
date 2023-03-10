import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { userRouter } from "./routes/users.routes";
import { IErrors } from "./types/errors.types";

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const PORT = 5500;

app.listen(PORT, async () => {
  console.log(`server listen ${PORT}`);
  await mongoose.connect("mongodb://127.0.0.1:27017/sep-2022");
});

app.use((err: IErrors, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status).json({ message: err.message, status: err.status });
});

app.use("/users", userRouter);
