import { Router } from "express";
import { HunchController } from "../controllers/HunchController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const hunchesRoutes = Router();
const hunchController = new HunchController()

hunchesRoutes.get("/", ensureAuthenticated, hunchController.create)

export {
    hunchesRoutes
}