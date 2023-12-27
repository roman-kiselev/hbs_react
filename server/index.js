import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import fileUpload from "express-fileupload";
import * as path from "path";
import sequelize from "./src/db.js";
import ErrorHandlingMIddleware from "./src/middleware/ErrorHandlingMIddleware.js";
import routes from "./src/routes/index.js";
dotenv.config();
const PORT = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.static(path.resolve("static/objects/img")));
app.use(fileUpload({}));
app.use(express.json({ limit: "10mb" }));

// Здесь подключаем общий роутер
app.use("/api", routes);

// Вытянул, ещё раз

app.use(ErrorHandlingMIddleware);
// Слушаем порт сервера
(async () => {
    await sequelize.sync({ force: false }).then(() => [
        app.listen(PORT, function () {
            console.log(`Сервер ожидает подключения...${PORT}`);
        }),
    ]);
})();
