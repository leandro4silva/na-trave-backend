"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesRoutes = void 0;
const express_1 = require("express");
const GameController_1 = require("../controllers/GameController");
const gamesRoutes = (0, express_1.Router)();
exports.gamesRoutes = gamesRoutes;
const gameController = new GameController_1.GameController();
gamesRoutes.get("/", gameController.index);
