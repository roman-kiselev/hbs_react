import * as dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import { ErrorHandlerMiddleware } from "./middlewares/ErrorHandlerMiddleware";
dotenv.config();

import cors from "cors";
import * as path from "path";
const PORT = process.env.PORT || 3001;

// Импорты из моиих папок
import db from "./models/db";
import mainRouter from "./routes";

const app = express();

app.use(cors());
app.use(fileUpload({}));
app.use(express.static(path.join(__dirname, "static")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api", mainRouter);
const start = async () => {
    await db.sync().then(() => {
        app.listen(PORT, () => {
            console.log(`Server started on port ${PORT}`);
        });
    });
};
app.use(ErrorHandlerMiddleware);
start();

export default app;
