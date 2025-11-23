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
exports.getEscolas = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getEscolas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Pega os filtros da URL (ex: /api/escolas?nome=teste&municipio=recife)
        const { nome, municipio } = req.query;
        // Monta o objeto de filtro do Prisma dinamicamente
        const whereClause = {};
        if (nome) {
            // Busca parcial (contém) e insensível a maiúsculas/minúsculas
            whereClause.nome_escola = { contains: String(nome), mode: 'insensitive' };
        }
        if (municipio) {
            whereClause.nome_municipio = { contains: String(municipio), mode: 'insensitive' };
        }
        // Busca no banco limitado a 50 resultados para não travar
        const escolas = yield prisma.escola.findMany({
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
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Erro ao buscar escolas' });
    }
});
exports.getEscolas = getEscolas;
