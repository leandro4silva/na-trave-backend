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
exports.HunchController = void 0;
const AppError_1 = require("../utils/AppError");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class HunchController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { user_id } = request.user;
            const { gameId, homeTeamScore = 0, awayTeamScore = 0 } = request.body;
            if (!homeTeamScore && !awayTeamScore) {
                throw new AppError_1.AppError("Insira o palpite, por favor!");
            }
            try {
                const [hunch] = yield prisma.hunch.findMany({
                    where: {
                        userId: user_id,
                        gameId
                    }
                });
                if (hunch) {
                    const hunchUpdate = yield prisma.hunch.update({
                        where: {
                            id: hunch.id
                        },
                        data: {
                            homeTeamScore: parseInt(homeTeamScore),
                            awayTeamScore: parseInt(awayTeamScore),
                        }
                    });
                    return response.status(201).json(hunchUpdate);
                }
                else {
                    const hunchCreate = yield prisma.hunch.create({
                        data: {
                            homeTeamScore: parseInt(homeTeamScore),
                            awayTeamScore: parseInt(awayTeamScore),
                            userId: user_id,
                            gameId
                        }
                    });
                    return response.status(201).json(hunchCreate);
                }
            }
            catch (error) {
                console.log(error);
                throw new AppError_1.AppError("Erro inesperado ao criar palpite!");
            }
        });
    }
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = request.params;
            try {
                const user = yield prisma.user.findUnique({
                    where: {
                        username
                    }
                });
                if (!user) {
                    throw new AppError_1.AppError("Usuario não encontrado");
                }
                const hunches = yield prisma.hunch.findMany({
                    where: {
                        userId: user.id
                    }
                });
                return response.json(hunches);
            }
            catch (error) {
                console.log(error);
                throw new AppError_1.AppError("Erro ao listar palpites!");
            }
        });
    }
}
exports.HunchController = HunchController;
