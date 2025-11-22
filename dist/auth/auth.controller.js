"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = (req, res) => {
    const { email, password } = req.body;
    // Lógica Fixa Solicitada
    // OBS: Em produção, buscaria no banco via Prisma e compararia hash
    if (email === 'Vitor' && password === '123456') {
        const token = jsonwebtoken_1.default.sign({ user: 'Vitor', role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        return res.json({ auth: true, token });
    }
    return res.status(401).json({ message: 'Login inválido' });
};
exports.login = login;
