import ApiError from "../../lib";

import path from "path";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
class FilesService {
    async createFile(file: Express.Multer.File): Promise<string | ApiError> {
        try {
            console.log(file);
            const fileName = uuidv4() + ".jpg";
            const filePath = path.resolve(
                __dirname,
                "..",
                "..",
                "static",
                fileName
            );
            console.log(filePath);
            if (!fs.existsSync(filePath)) {
                fs.mkdirSync(filePath, { recursive: true });
            }
            console.log(file);
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        } catch (e) {
            console.error(e);
            return ApiError.serverError("Непредвиденная ошибка");
        }
    }

    async deleteFile(fileName: string): Promise<boolean | ApiError> {
        try {
            const filePath = path.resolve(
                __dirname,
                "..",
                "..",
                "static",
                fileName
            );
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
                return true;
            }
            return ApiError.notFound("Файл не найден");
        } catch (e) {
            console.error(e);
            return ApiError.serverError("Непредвиденная ошибка");
        }
    }
}

export default new FilesService();
