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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionController = void 0;
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
const client_1 = require("@prisma/client");
const auth_1 = __importDefault(require("../configs/auth"));
const AppError_1 = require("../utils/AppError");
const prisma = new client_1.PrismaClient();
class SessionController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = request.body;
            const user = yield prisma.user.findFirst({
                where: { email }
            });
            if (!user) {
                throw new AppError_1.AppError("Email e/ou senha incorretos!", 401);
            }
            const passwordMatched = yield (0, bcrypt_1.compare)(password, user.password);
            if (!passwordMatched) {
                throw new AppError_1.AppError("Email e/ou senha incorretos!", 401);
            }
            const { secret, expiresIn } = auth_1.default.jwt;
            const token = (0, jsonwebtoken_1.sign)({}, secret, {
                subject: String(user.id),
                expiresIn
            });
            response.json({ user, token });
        });
    }
}
exports.SessionController = SessionController;
