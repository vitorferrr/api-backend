"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const escolas_controller_1 = require("./escolas.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.verifyToken, escolas_controller_1.getEscolas);
exports.default = router;
