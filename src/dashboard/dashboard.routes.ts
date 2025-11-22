import { Router } from 'express';
import { getDashboardData } from './dashboard.controller';
import { verifyToken } from '../middlewares/auth.middleware'; // Importe o segurança

const router = Router();

/**
 * @swagger
 * /dashboard:
 * get:
 * summary: Retorna dados e KPIs das escolas
 * tags: [Dashboard]
 * security:
 * - bearerAuth: []     <-- Isso avisa ao Swagger que precisa de cadeado
 * responses:
 * 200:
 * description: Dados carregados com sucesso
 * 401:
 * description: Não autorizado
 */
// Adicione o verifyToken ANTES do getDashboardData
router.get('/', verifyToken, getDashboardData);

export default router;