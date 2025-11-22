"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Realiza login
 * tags: [Auth]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email:
 * type: string
 * password:
 * type: string
 * responses:
 * 200:
 * description: Login sucesso
 */
router.post('/login', auth_controller_1.login);
exports.default = router;
