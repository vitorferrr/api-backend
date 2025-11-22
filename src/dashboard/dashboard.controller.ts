import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // 1. Contagem total de escolas
    const totalEscolas = await prisma.escola.count();

    // 2. Agrupar escolas por Região (Ex: Norte, Sul...)
    // O prisma faz isso usando o relacionamento com a tabela 'regiao'
    const escolasPorRegiao = await prisma.escola.groupBy({
      by: ['id_regiao'],
      _count: {
        id_escola: true,
      },
    });

    // Como o groupBy devolve apenas o ID, vamos buscar os nomes das regiões manualmente ou tratar no front
    // Uma query crua as vezes é mais simples para joins complexos em Dashboards:
    const dadosGrafico = await prisma.$queryRaw`
      SELECT r.nome_regiao as name, COUNT(e.id_escola) as value
      FROM escola e
      JOIN regiao r ON e.id_regiao = r.id_regiao
      GROUP BY r.nome_regiao
    `;

    // 3. Buscar algumas escolas para listar na tabela (limitado a 10 para não travar)
    const listaEscolas = await prisma.escola.findMany({
      take: 10,
      select: {
        id_escola: true,
        nome_escola: true,
        nome_municipio: true,
        nome_uf: true,
      }
    });

    return res.json({
      kpis: {
        totalEscolas,
      },
      charts: {
        byRegion: dadosGrafico, // Isso vai direto para o ECharts
      },
      table: listaEscolas
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
};