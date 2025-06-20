import {getRepository} from "typeorm";
import {User} from "../entity/User" ;
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import * as md5 from "md5";

export class AuthController { 
    async register (req: Request, res: Response){
        const {username, email, password} = req.body;
        const userRepository = (User);

        // const existingUser = await userRepository.findOne({where: {email}});
        // if (existingUser) return res.status(400).json({message: "Пользователь уже существует"});
        
        // const hashedPassword = await bcrypt.hash(password, 10);
        // const user = userRepository.create({username, email, password: hashedPassword});
        const user = Object.assign({
            firstName: "",
            username: username,
            email: email,
            password: password,
        })

        await AppDataSource.getRepository(User).save(user)
        res.status(201).json({message: "Пользователь создан", user:user});
    }
    async login(req: Request, res: Response) {
        const {email, password} = req.body;
        const userRepository = AppDataSource.getRepository(User);
        const user = await userRepository.findOne({where: {email}});

        if (!user) {
            console.log(md5("123"))
            res.status(400).json({message:"Неверные учетные данные"});
            return
        } else if(user.password != password) {
            res.status(400).json({message:"Неверный пароль"});
            return
        }

        // const isMatch = await bcrypt.compare(password, user.password);
        // if (!isMatch) return res.status(400).json({message:"Неверные учетные данные"});

        const token = md5(`${email}${password}`)
        user.token = token
        await userRepository.save(user)
        res.json({token: token});
    }
}