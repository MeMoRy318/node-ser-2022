import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { userRouter } from "./routes/user.roter";
import { IErrors } from "./types/errors.type";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 5200;

app.listen(PORT, async (): Promise<void> => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sep-2022");
  console.log("serve listen", PORT);
});

app.use("/users", userRouter);

app.use((err: IErrors, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ message: err.message, status: err.status });
});
