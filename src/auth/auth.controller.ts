import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import * as jwt from 'jsonwebtoken';

const prisma = new PrismaClient();


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  console.log('Tentativa de login:', { email });

  try {
    const user = await prisma.user.findUnique({ 
      where: { email } 
    });

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, role: 'user' }, 
      process.env.JWT_SECRET || 'uma_chave_segura',    
      { expiresIn: '1h' }
    );

    return res.json({ auth: true, token, name: user.name || user.email });

  } catch (error) {
    console.error("Erro no login:", error);
    return res.status(500).json({ error: 'Erro interno ao realizar login' });
  }
};

export const register = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    
    if (userExists) {
      return res.status(400).json({ message: 'Email já cadastrado' });
    }

    const newUser = await prisma.user.create({
      data: { 
        name, 
        email, 
        password 
      }
    });

    return res.status(201).json({ 
      message: "Usuário criado com sucesso!",
      user: { id: newUser.id, email: newUser.email, name: newUser.name }
    });

  } catch (error) {
    console.error("Erro no cadastro:", error);
    return res.status(500).json({ error: 'Erro ao criar usuário' });
  }
};