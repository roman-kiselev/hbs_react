import { Request, Response } from "express";
import { IUserCreate, IUserLogin } from "../../interfaces";
import { User } from "../../models/user";
import { UsersService } from "../../services";

interface RequestUser extends Request {
    user: User;
}

interface IUserController {
    registration(req: Request, res: Response): void;
    login(req: Request, res: Response): void;
    check(req: RequestUser, res: Response): void;
}

class UserController implements IUserController {
    async registration(req: Request, res: Response) {
        try {
            const dto = req.body as IUserCreate;
            const token = await UsersService.registrationUser(dto);
            return res.status(201).json({ token });
        } catch (e) {
            console.log(e);
        }
    }

    async login(req: Request, res: Response) {
        try {
            const dto = req.body as IUserLogin;
            const token = await UsersService.loginUser(dto);
            //console.log(token);
            return res.status(200).json({ token });
        } catch (e) {
            console.log(e);
        }
    }

    async check(req: RequestUser, res: Response) {
        try {
            const user = req.user;
            const token = await UsersService.check(user);
            //console.log(user);
            return res.status(200).json({ token });
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserController();
