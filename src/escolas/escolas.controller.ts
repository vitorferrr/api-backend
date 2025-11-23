import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEscolas = async (req: Request, res: Response) => {
  try {
    // Recebe os filtros da URL
    const { nome, municipio, dependencia } = req.query;

    const whereClause: any = {};

    // 1. Filtro por Nome da Escola
    if (nome) {
        whereClause.nome_escola = { contains: String(nome), mode: 'insensitive' };
    }

    // 2. Filtro por Município
    if (municipio) {
        whereClause.nome_municipio = { contains: String(municipio), mode: 'insensitive' };
    }

    // 3. NOVO: Filtro por Dependência Administrativa
    // Como a dependencia está em outra tabela, usamos a relação 'dependencia_escolar'
    if (dependencia && String(dependencia) !== "Todas") {
        whereClause.dependencia_escolar = {
            tipo_dependencia: { contains: String(dependencia), mode: 'insensitive' }
        };
    }

    const escolas = await prisma.escola.findMany({
      where: whereClause,
      take: 50, // Limite de segurança
      select: {
        id_escola: true,
        nome_escola: true,
        nome_municipio: true,
        nome_uf: true,
        // Inclui o nome da dependência para mostrar na tabela
        dependencia_escolar: {
            select: { tipo_dependencia: true }
        }
      },
      orderBy: { nome_escola: 'asc' }
    });

    return res.json(escolas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar escolas' });
  }
};