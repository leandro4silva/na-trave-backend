"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const bcrypt_1 = require("bcrypt");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const AppError_1 = require("../utils/AppError");
class UserController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, username, password } = request.body;
            if (!name) {
                throw new AppError_1.AppError('Insira o seu nome por favor!');
            }
            if (!username) {
                throw new AppError_1.AppError('Insira um username por favor!');
            }
            const checkPassword = String(password).length;
            if (checkPassword < 6) {
                throw new AppError_1.AppError("Insira uma senha maior que 6 caracteres, por favor!");
            }
            const usernameExist = yield prisma.user.findFirst({
                where: {
                    username
                }
            });
            if (usernameExist) {
                throw new AppError_1.AppError("Esse username já existe");
            }
            const emailExist = yield prisma.user.findFirst({
                where: { email }
            });
            if (emailExist) {
                throw new AppError_1.AppError("Esse email já está cadastrado!");
            }
            const hashedPassword = yield (0, bcrypt_1.hash)(password, 8);
            try {
                yield prisma.user.create({
                    data: {
                        name,
                        username,
                        email,
                        password: hashedPassword
                    }
                });
                return response.status(201).json();
            }
            catch (error) {
                console.log(error);
                throw new AppError_1.AppError("Erro inesperado ao criar usuário!");
            }
        });
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany();
                response.json(users);
            }
            catch (error) {
                console.log(error);
                throw new AppError_1.AppError("Erro Inesperado ao listar todos os usuários");
            }
        });
    }
    show(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = request.params;
            try {
                const user = yield prisma.user.findFirst({
                    where: {
                        username
                    }
                });
                return response.json(user);
            }
            catch (error) {
                console.log(error);
                throw new AppError_1.AppError("Erro Inesperado ao listar usuario");
            }
        });
    }
}
exports.UserController = UserController;
