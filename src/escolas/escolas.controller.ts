import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getEscolas = async (req: Request, res: Response) => {
  try {
    // Pega os filtros da URL (ex: /api/escolas?nome=teste&municipio=recife)
    const { nome, municipio } = req.query;

    // Monta o objeto de filtro do Prisma dinamicamente
    const whereClause: any = {};

    if (nome) {
        // Busca parcial (contém) e insensível a maiúsculas/minúsculas
        whereClause.nome_escola = { contains: String(nome), mode: 'insensitive' };
    }
    if (municipio) {
        whereClause.nome_municipio = { contains: String(municipio), mode: 'insensitive' };
    }

    // Busca no banco limitado a 50 resultados para não travar
    const escolas = await prisma.escola.findMany({
      where: whereClause,
      take: 50,
      select: {
        id_escola: true,
        nome_escola: true,
        nome_municipio: true,
        nome_uf: true,
        dependencia_escolar: { select: { tipo_dependencia: true } } // Exemplo de JOIN
      },
      orderBy: { nome_escola: 'asc' }
    });

    return res.json(escolas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar escolas' });
  }
};