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
exports.GameController = void 0;
const date_fns_1 = require("date-fns");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class GameController {
    index(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const { gameTime } = request.query;
            let games;
            if (gameTime) {
                games = yield prisma.game.findMany({
                    where: {
                        gameTime: {
                            gte: String(gameTime),
                            lt: (0, date_fns_1.formatISO)((0, date_fns_1.addDays)(new Date(String(gameTime)), 1))
                        }
                    }
                });
                return response.json(games);
            }
            else {
                games = yield prisma.game.findMany();
                return response.json(games);
            }
        });
    }
}
exports.GameController = GameController;
