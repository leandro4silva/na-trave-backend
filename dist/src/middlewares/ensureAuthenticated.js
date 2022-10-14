"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthenticated = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const auth_1 = __importDefault(require("../configs/auth"));
const AppError_1 = require("../utils/AppError");
function ensureAuthenticated(request, response, next) {
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError_1.AppError("JWT não informado", 401);
    }
    const [, token] = authHeader.split(' ');
    try {
        const { sub: user_id } = (0, jsonwebtoken_1.verify)(token, auth_1.default.jwt.secret);
        request.user = {
            user_id: String(user_id)
        };
        return next();
    }
    catch (_a) {
        throw new AppError_1.AppError("JWT Token Invalido", 401);
    }
}
exports.ensureAuthenticated = ensureAuthenticated;
