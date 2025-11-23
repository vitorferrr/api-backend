import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEscolas = async (req: Request, res: Response) => {
  try {
    // 1. Recebe os novos filtros da URL
    const { nome, municipio, dependencia, regiao, localizacao } = req.query;

    const whereClause: any = {};

    // --- Filtros Existentes ---
    if (nome) {
        whereClause.nome_escola = { contains: String(nome), mode: 'insensitive' };
    }
    if (municipio) {
        whereClause.nome_municipio = { contains: String(municipio), mode: 'insensitive' };
    }
    if (dependencia && String(dependencia) !== "Todas") {
        whereClause.dependencia_escolar = {
            tipo_dependencia: { contains: String(dependencia), mode: 'insensitive' }
        };
    }

    // --- NOVOS FILTROS ---
    
    // 2. Filtro por Região (Ex: Nordeste, Sudeste)
    // Usa a relação com a tabela 'regiao'
    if (regiao && String(regiao) !== "Todas") {
        whereClause.regiao = {
            nome_regiao: { contains: String(regiao), mode: 'insensitive' }
        };
    }

    // 3. Filtro por Localização (Ex: Urbana, Rural)
    // Usa a relação com a tabela 'localizacao_geografica'
    if (localizacao && String(localizacao) !== "Todas") {
        whereClause.localizacao_geografica = {
            tipo_localizacao: { contains: String(localizacao), mode: 'insensitive' }
        };
    }

    // --- Busca no Banco ---
    const escolas = await prisma.escola.findMany({
      where: whereClause,
      take: 50,
      select: {
        id_escola: true,
        nome_escola: true,
        nome_municipio: true,
        nome_uf: true,
        // Trazemos os dados das tabelas relacionadas para mostrar no front
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