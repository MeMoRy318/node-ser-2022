"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_module_1 = require("./models/User.module");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
const PORT = 5200;
app.listen(PORT, async () => {
    console.log(`server listen ${PORT}`);
    await mongoose_1.default.connect("mongodb://127.0.0.1:27017/sep-2022");
});
app.get("/users", async (req, res) => {
    const users = await User_module_1.User.find();
    res.status(200).json(users);
});
app.post("/users", async (req, res) => {
    const user = await req.body;
    await User_module_1.User.create(user);
    res.status(201).json(user);
});
app.get("/users/:userId", async (req, res) => {
    const { userId } = req.params;
    const user = await User_module_1.User.findById(userId);
    res.status(200).json(user);
});
app.put("/users/:userId", async (req, res) => {
    const user = req.body;
    const { userId } = req.params;
    await User_module_1.User.updateOne({ _id: userId }, user);
    res.status(201).json(user);
});
app.delete("/users/:userId", async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(userId);
        await User_module_1.User.deleteOne({ _id: userId });
        res.sendStatus(204);
    }
    catch (e) {
        console.log(e.message);
        res.sendStatus(204);
    }
});
