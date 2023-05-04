// import { Request, Response } from "express";
// import {
//   createUser,
//   getUserById,
//   getUsers,
//   deleteUser,
//   updateUser,
// } from "./user.service";

// export const createUserController = (req: Request, res: Response) => {
//   try {
//     const user = createUser(req, res);
//     res.status(201).json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getUsersController = (req: Request, res: Response) => {
//   try {
//     const users = getUsers(req, res);
//     res.status(200).json(users);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const getUserByIdController = (req: Request, res: Response) => {
//   try {
//     const user = getUserById(req, res);
//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const updateUserController = (req: Request, res: Response) => {
//   try {
//     const user = updateUser(req, res);
//     res.status(200).json(user);
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };

// export const deleteUserController = (req: Request, res: Response) => {
//   try {
//     deleteUser(req, res);
//     res.status(204).end();
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ message: "Internal server error" });
//   }
// };
