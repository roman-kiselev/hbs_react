import Models from '../models/models.js'
import bcrypt from "bcrypt"
import Model from "../models/models.js"
import ApiError from '../error/ApiError.js';
import jwt from 'jsonwebtoken';
import * as dotenv from "dotenv";
dotenv.config();
import chalk from 'chalk';


const generateJwt = (id, login, role) => {
    return jwt.sign(
        {
            id: id,
            login: login,
            role: role
        },
        process.env.SECRET_KEY,
        {expiresIn: '24h'}
    )
}

class UserController {

    async registration (req, res, next) {

        const { login, password, role } = req.body;
        if (!login || !password) {
            return next(ApiError.badRequest('Неккоректный login или password'))
        }
        const candidate = await Model.User.findOne({
            where: {login}
        })
        if (candidate) {
            return next(ApiError.badRequest('Такой пользователь уже есть'))
        }

        // Хэшируем пароль
        const hashPassword = await bcrypt.hash(password, 5)

        const findRole = await Model.Role.findOne({where: {name: role}})
        const {id: resultroleId, name: resultRoleName} = findRole

        const user = await Model.User.create({login, password: hashPassword})

        const userRole = await Model.UsersRoles.create({userId: user.id, roleId: resultroleId})

        const token = generateJwt(user.id, user.login, resultRoleName)


        return res.json({token})
    }

    async login(req, res, next) {
        const {login, password} = req.body;
        const user = await Model.User.findOne({where: {login}, include:{all: true}})
        const {roles} = user

        if (!user) {
            return next(ApiError.internal("Пользователь не найден"))
        }


        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }

        const token = generateJwt(user.id, user.login, roles)
        return res.json({token})
    }

    async check (req, res, next) {
        const token = generateJwt(req.user.id, req.user.login, req.user.role)
        return res.json({token})
    }

    async getAll (req, res) {
        try {
            const users = await Model.User.findAll({include: {all: true}})
            return res.json({users})
        } catch (e) {
            console.log(e)
        }
    }

    async dropUser (req, res) {
        try {
            const {id} = req.params
            const user = await Models.User.findOne({where: {id}, include: {all: true}})
            await user.destroy()

            return res.json({user})
        } catch (e) {
            console.log(e)
        }
    }

}


export default new UserController();