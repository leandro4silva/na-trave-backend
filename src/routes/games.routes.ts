import { Router } from "express";
import { GameController } from "../controllers/GameController";

const gamesRoutes = Router();
const gameController = new GameController()

gamesRoutes.get("/", gameController.index)

export{
    gamesRoutes
}