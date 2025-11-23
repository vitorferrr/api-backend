import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'; // Importação segura

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('Tentativa de login:', { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  if (email.toLowerCase() === 'vitor' && password === '123456') {
    
    const token = jwt.sign(
      { user: 'Vitor', role: 'admin' }, 
      process.env.JWT_SECRET || 'uma_chave_segura', 
      { expiresIn: '1h' }
    );

    return res.json({ auth: true, token, name: 'Vitor' });
  }

  return res.status(401).json({ message: 'Login inválido' });
};