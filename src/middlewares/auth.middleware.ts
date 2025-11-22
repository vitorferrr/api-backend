import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  // 1. Busca o cabeçalho "Authorization"
  const authHeader = req.headers['authorization'];
  
  // 2. Se não tiver cabeçalho, barra na hora
  if (!authHeader) {
    return res.status(401).json({ message: 'Token não fornecido.' });
  }

  // 3. O cabeçalho vem como "Bearer <token>", então separamos para pegar só o token
  const token = authHeader.split(' ')[1]; // Pega a segunda parte

  if (!token) {
    return res.status(401).json({ message: 'Formato de token inválido.' });
  }

  try {
    // 4. Verifica se a assinatura do token bate com a nossa senha secreta
    jwt.verify(token, process.env.JWT_SECRET || 'secret');
    
    // 5. Se deu certo, deixa a requisição passar para o Controller
    next();
  } catch (error) {
    // 6. Se o token expirou ou é falso, barra aqui
    return res.status(403).json({ message: 'Token inválido ou expirado.' });
  }
};