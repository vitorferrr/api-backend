import { Router } from 'express';
import { getDashboardData } from './dashboard.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

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
router.get('/', verifyToken, getDashboardData);

export default router;