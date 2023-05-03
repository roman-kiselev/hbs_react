import express from "express";
import { Sequelize } from "sequelize-typescript";

const app = express();
//const sequelize = new Sequelize('mysql://user:password@localhost:3306/database');

app.get("/", (req, res) => {
    res.send("Hello Wod!");
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
