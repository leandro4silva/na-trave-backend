"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hunchesRoutes = void 0;
const express_1 = require("express");
const HunchController_1 = require("../controllers/HunchController");
const ensureAuthenticated_1 = require("../middlewares/ensureAuthenticated");
const hunchesRoutes = (0, express_1.Router)();
exports.hunchesRoutes = hunchesRoutes;
const hunchController = new HunchController_1.HunchController();
hunchesRoutes.post("/", ensureAuthenticated_1.ensureAuthenticated, hunchController.create);
hunchesRoutes.get("/:username", hunchController.index);
