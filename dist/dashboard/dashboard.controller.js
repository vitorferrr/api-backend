"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Contagem total de escolas
        const totalEscolas = yield prisma.escola.count();
        // 2. Agrupar escolas por Região (Ex: Norte, Sul...)
        // O prisma faz isso usando o relacionamento com a tabela 'regiao'
        const escolasPorRegiao = yield prisma.escola.groupBy({
            by: ['id_regiao'],
            _count: {
                id_escola: true,
            },
        });
        // Como o groupBy devolve apenas o ID, vamos buscar os nomes das regiões manualmente ou tratar no front
        // Uma query crua as vezes é mais simples para joins complexos em Dashboards:
        const dadosGrafico = yield prisma.$queryRaw `
      SELECT r.nome_regiao as name, COUNT(e.id_escola) as value
      FROM escola e
      JOIN regiao r ON e.id_regiao = r.id_regiao
      GROUP BY r.nome_regiao
    `;
        // 3. Buscar algumas escolas para listar na tabela (limitado a 10 para não travar)
        const listaEscolas = yield prisma.escola.findMany({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar dados do dashboard' });
    }
});
exports.getDashboardData = getDashboardData;
