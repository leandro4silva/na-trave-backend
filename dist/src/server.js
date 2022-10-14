"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const index_1 = require("./routes/index");
const AppError_1 = require("./utils/AppError");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(index_1.routes);
app.use((error, request, response, next) => {
    if (error instanceof AppError_1.AppError) {
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    }
    console.log(error);
    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});
const PORT = process.env.SERVER_PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
