import express, { NextFunction, Request, Response, urlencoded } from "express";
import mongoose from "mongoose";

import { userRoute } from "./routes/user.route";
import { IError } from "./types/error.type";

const app = express();

app.use(express.json());
app.use(urlencoded({ extended: true }));

app.use("/users", userRoute);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  res
    .status(err.status || 500)
    .json({ message: err.message, status: err.status });
});

const PORT = 7000;

app.listen(PORT, async () => {
  await mongoose.connect("mongodb://127.0.0.1:27017/sep-2022");
  console.log(`server listen ${PORT}`);
});
