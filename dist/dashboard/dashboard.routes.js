"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dashboard_controller_1 = require("./dashboard.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /dashboard:
 * get:
 * summary: Retorna dados e KPIs das escolas
 * tags: [Dashboard]
 * security:
 * - bearerAuth: []
 * responses:
 * 200:
 * description: Dados carregados com sucesso
 * 401:
 * description: Não autorizado
 */
router.get('/', auth_middleware_1.verifyToken, dashboard_controller_1.getDashboardData);
exports.default = router;
