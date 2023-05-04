import { User, UsersRole } from "../../models/user";
import { IUserCreate } from "../../interfaces";
import ApiError from "../../lib";

class CreateUserDto {
    login: string;
    password: string;
}

export const createUser = async (dto: CreateUserDto) => {
    try {
        const user = await User.create(dto);
        if (!user) {
            return ApiError.badRequest("Не удаётся создать пользователя");
        }

        return user;
    } catch (e) {
        console.log(e);
        return ApiError.serverError("Ошибка сервера");
    }
};

// export const createUser = (req: Request, res: Response) => {
//     const { name, email } = req.body;
//     const newUser: User = { id: Date.now().toString(), name, email };
//     users.push(newUser);
//     res.status(201).json(newUser);
//   };

//   export const getUsers = (req: Request, res: Response) => {
//     res.status(200).json(users);
//   };

//   export const getUserById = (req: Request, res: Response) => {
//     const user = users.find((u) => u.id === req.params.id);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     res.status(200).json(user);
//   };

//   export const updateUser = (req: Request, res: Response) => {
//     const userIndex = users.findIndex((u) => u.id === req.params.id);
//     if (userIndex === -1) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const { name, email } = req.body;
//     users[userIndex] = { ...users[userIndex], name, email };
//     res.status(200).json(users[userIndex]);
//   };

//   export const deleteUser = (req: Request, res: Response) => {
//     const userIndex = users.findIndex((u) => u.id === req.params.id);
//     if (userIndex === -1) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     users.splice(userIndex, 1);
//     res.status(204).end();
//   };
