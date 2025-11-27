import { Router } from 'express';
import { login, register } from './auth.controller';

const router = Router();

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
router.post('/login', login);
router.post('/register', register);

export default router;