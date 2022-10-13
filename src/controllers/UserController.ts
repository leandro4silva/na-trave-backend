import { Request, response, Response } from "express";
import {hash} from "bcrypt";
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()


import { AppError } from "../utils/AppError";

class UserController {
   
    async create(request: Request, response: Response) {
        const { name, email, username, password } = request.body;
        
        if (!name) {
            throw new AppError('Insira o seu nome por favor!');
        }

        if (!username) {
            throw new AppError('Insira um username por favor!');
        }

        const checkPassword = String(password).length;

        if (checkPassword < 6) {
            throw new AppError("Insira uma senha maior que 6 caracteres, por favor!");
        }

        const usernameExist = await prisma.user.findFirst({
            where:{
                username            
            }
        })

        if(usernameExist){
            throw new AppError("Esse username já existe");
        }

        const emailExist = await prisma.user.findFirst({
            where: { email }
        });

        if (emailExist) {
            throw new AppError("Esse email já está cadastrado!");
        }

        const hashedPassword = await hash(password, 8);

        try{
            await prisma.user.create({
                data: {
                    name,
                    username,
                    email,
                    password: hashedPassword
                }
            });
            return response.status(201).json()

        }catch(error){
            console.log(error)
            throw new AppError("Erro inesperado ao criar usuário!");
        }

    }

    async index(request: Request, response: Response){
        try{
            const users = await prisma.user.findMany()
            response.json(users)
        }catch(error){
            console.log(error)
            throw new AppError("Erro Inesperado ao listar todos os usuários")
        }
    }
}


export {
    UserController
}