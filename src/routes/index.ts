import {Router} from "express";

import { userRoutes } from "./users.routes";
import { hunchesRoutes } from "./hunches.routes";
import { sessionRoutes } from "./sessions.routes";
import { gamesRoutes } from "./games.routes";

const routes = Router();

routes.use('/users', userRoutes)
routes.use('/hunches', hunchesRoutes)
routes.use('/sessions', sessionRoutes)
routes.use('/games', gamesRoutes)

export {routes};