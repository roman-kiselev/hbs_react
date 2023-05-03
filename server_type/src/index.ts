import express from "express";
import { Sequelize } from "sequelize-typescript";
import * as dotenv from "dotenv";
dotenv.config();
import cors from "cors";
const PORT = process.env.PORT || 7777;
import * as path from "path";

// Импорты из моиих папок
import db from "./models/db";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello Wod!");
});

app.listen(PORT, () => {
    console.log("Server started on port 3000");
});
