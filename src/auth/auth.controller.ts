import { Request, Response } from 'express';
import jwt = require('jsonwebtoken');

export const login = (req: Request, res: Response) => {
  const { user, password } = req.body;

  console.log('Tentativa de login:', { user, password });
  // Lógica Fixa Solicitada
  // OBS: Em produção, buscaria no banco via Prisma e compararia hash
  if (user.toLowerCase() === 'Vitor' && password === '123456') {
    const token = jwt.sign(
      { user: 'Vitor', role: 'admin' }, 
      process.env.JWT_SECRET || 'uma_chave_segura', 
      { expiresIn: '1h' }
    );
    
    return res.json({ auth: true, token });
  }

  return res.status(401).json({ message: 'Login inválido' });
};