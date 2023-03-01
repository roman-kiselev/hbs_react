import express from 'express';
import cors from 'cors'
import sequelize from './db.js';
import dotenv from "dotenv";
import fileUpload from "express-fileupload"
dotenv.config()
import routes from "./routes/index.js";
const PORT = process.env.PORT;
import * as path from "path";
import Models from './models/models.js'
import ErrorHandlingMIddleware from "./middleware/ErrorHandlingMIddleware.js";
const app = express();
app.use(cors());
app.use(express.static(path.resolve('static/objects/img')));
app.use(fileUpload({}))
app.use(express.json());




// Здесь подключаем общий роутер
app.use('/api',  routes);


// Вытянул


app.use(ErrorHandlingMIddleware);
// Слушаем порт сервера
(async () => {
    await sequelize.sync({force: false}).then( () => [
        app.listen(PORT, function () {
            console.log(`Сервер ожидает подключения...${PORT}`);
        })
    ]);
})();
