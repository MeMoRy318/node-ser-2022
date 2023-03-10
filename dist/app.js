"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const users_routes_1 = require("./routes/users.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = 5500;
app.listen(PORT, async () => {
    console.log(`server listen ${PORT}`);
    await mongoose_1.default.connect("mongodb://127.0.0.1:27017/sep-2022");
});
app.use((err, req, res, next) => {
    res.status(err.status).json({ message: err.message, status: err.status });
});
app.use("/users", users_routes_1.userRouter);
