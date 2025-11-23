import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEscolas = async (req: Request, res: Response) => {
  try {
    const { nome, municipio, dependencia, regiao, localizacao } = req.query;

    const whereClause: any = {};

    // Filtros de Texto
    if (nome) whereClause.nome_escola = { contains: String(nome), mode: 'insensitive' };
    if (municipio) whereClause.nome_municipio = { contains: String(municipio), mode: 'insensitive' };

    // Filtros de Relação
    if (dependencia && String(dependencia) !== "Todas") {
        whereClause.dependencia_escolar = { tipo_dependencia: { contains: String(dependencia), mode: 'insensitive' } };
    }

    if (regiao && String(regiao) !== "Todas") {
        whereClause.regiao = { nome_regiao: { contains: String(regiao), mode: 'insensitive' } };
    }

    if (localizacao && String(localizacao) !== "Todas") {
        whereClause.localizacao_geografica = { tipo_localizacao: { contains: String(localizacao), mode: 'insensitive' } };
    }

    const escolas = await prisma.escola.findMany({
      where: whereClause,
      take: 50,
      select: {
        id_escola: true,
        nome_escola: true,
        nome_municipio: true,
        nome_uf: true,
        dependencia_escolar: { select: { tipo_dependencia: true } },
        regiao: { select: { nome_regiao: true } },
        localizacao_geografica: { select: { tipo_localizacao: true } } 
      },
      orderBy: { nome_escola: 'asc' }
    });

    return res.json(escolas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar escolas' });
  }
};