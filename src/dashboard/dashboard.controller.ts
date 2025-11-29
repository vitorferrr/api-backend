import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getDashboardData = async (req: Request, res: Response) => {
  try {
    // Total de Escolas
    const totalEscolas = await prisma.escola.count();

    // Dados para o Gráfico 
    const escolasPorRegiao = await prisma.regiao.findMany({
      select: {
        nome_regiao: true,
        _count: {
          select: { escola: true }
        }
      }
    });

    // Formata para o padrão ECharts
    const dadosGrafico = escolasPorRegiao.map(item => ({
      name: item.nome_regiao,
      value: item._count.escola
    }));

    return res.json({
      kpis: {
        totalEscolas,
      },
      charts: {
        byRegion: dadosGrafico,
      }
    });

  } catch (error) {
    console.error("Erro no Dashboard:", error);
    return res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
  }
};