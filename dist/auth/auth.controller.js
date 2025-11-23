"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jwt = require("jsonwebtoken");
const login = (req, res) => {
    const { user, password } = req.body;
    console.log('Tentativa de login:', { user, password });
    // Lógica Fixa Solicitada
    // OBS: Em produção, buscaria no banco via Prisma e compararia hash
    if (user.toLowerCase() === 'Vitor' && password === '123456') {
        const token = jwt.sign({ user: 'Vitor', role: 'admin' }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        return res.json({ auth: true, token });
    }
    return res.status(401).json({ message: 'Login inválido' });
};
exports.login = login;
