import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken'; // Importação segura

export const login = (req: Request, res: Response) => {
  // 1. CORREÇÃO: O Frontend envia 'email', então temos que desestruturar 'email'
  const { email, password } = req.body;

  console.log('Tentativa de login:', { email, password });

  // 2. PROTEÇÃO ANTI-CRASH (Erro 500)
  // Se o email vier vazio ou undefined, paramos aqui antes de tentar usar .toLowerCase()
  if (!email || !password) {
    return res.status(400).json({ message: 'Usuário e senha são obrigatórios.' });
  }

  // 3. LÓGICA DE COMPARAÇÃO CORRIGIDA
  // Convertemos o email recebido para minúsculo e comparamos com 'vitor' (minúsculo)
  // Assim funciona tanto se digitar "Vitor" quanto "vitor"
  if (email.toLowerCase() === 'vitor' && password === '123456') {
    
    const token = jwt.sign(
      { user: 'Vitor', role: 'admin' }, 
      process.env.JWT_SECRET || 'uma_chave_segura', 
      { expiresIn: '1h' }
    );
    
    // Retornamos 'name' também, pois o Frontend espera isso para exibir "Olá, Vitor"
    return res.json({ auth: true, token, name: 'Vitor' });
  }

  return res.status(401).json({ message: 'Login inválido' });
};