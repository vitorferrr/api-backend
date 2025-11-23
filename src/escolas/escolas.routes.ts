import { Router } from 'express';
import { getEscolas } from './escolas.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

router.get('/', verifyToken, getEscolas);

export default router;