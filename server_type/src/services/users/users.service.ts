import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { Role, User, UsersRole } from "../../models/user";
import { IUserCreate, IUserLogin } from "../../interfaces";
import ApiError from "../../lib";
import { RoleService } from ".";
import * as dotenv from "dotenv";
dotenv.config();

class CreateUserDto {
    login: string;
    password: string;
}

const generateJwt = (id: string, login: string, role: any) => {
    return jwt.sign(
        {
            id: id,
            login: login,
            roles: role,
        },
        process.env.SECRET_KEY,
        { expiresIn: "8h" }
    );
};

export interface IUserService {
    registrationUser(dto: IUserCreate): Promise<any>;
    loginUser(dto: IUserLogin): Promise<User | ApiError>;
    check(user: User): any;
    // getAll(): Promise<User[]>;
    // getById(id: string): Promise<User>;
    // update(id: string, dto: IUserCreate): Promise<User>;
    // delete(id: string): Promise<User>;
}

class UserService implements IUserService {
    async registrationUser(dto: IUserCreate): Promise<any> {
        try {
            const { login, password, role = "user" } = dto;

            if (!login || !password) {
                return ApiError.badRequest("Не удаётся создать пользователя");
            }
            const candidate = await User.findOne({
                where: { login },
            });
            if (candidate) {
                return ApiError.badRequest(
                    "Пользователь с таким логином уже существует"
                );
            }
            // Хэшируем пароль
            const hashPassword = await bcrypt.hash(password, 5);
            const roleFind = await RoleService.getRoleByNameS(role);

            if (roleFind instanceof ApiError) {
                return roleFind;
            }

            const user = await User.create({
                login,
                password: hashPassword,
            });

            const token = generateJwt(user.id.toString(), user.login, [
                roleFind,
            ]);

            await user.$add("roles", roleFind);
            user.roles = [roleFind];
            return token;
        } catch (e) {
            console.log(e);
        }
    }

    async loginUser(dto: IUserLogin): Promise<User | ApiError> {
        try {
            const { login, password } = dto;
            const user = await User.findOne({
                where: { login },
                include: { model: Role },
            });

            if (!user) {
                return ApiError.badRequest("Пользователь не найден");
            }

            let comparePassword = bcrypt.compareSync(password, user.password);
            if (!comparePassword) {
                return ApiError.forbidden("Неверный логин или пароль");
            }
            const token = generateJwt(
                user.id.toString(),
                user.login,
                user.roles
            );

            return token;
        } catch (e) {
            console.log(e);
        }
    }

    async check(user: User) {
        try {
            const token = generateJwt(
                user.id.toString(),
                user.login,
                user.roles
            );
            return token;
        } catch (e) {
            console.log(e);
        }
    }
}

export default new UserService();
