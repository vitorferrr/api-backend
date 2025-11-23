"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const auth_routes_1 = __importDefault(require("./auth/auth.routes"));
const dashboard_routes_1 = __importDefault(require("./dashboard/dashboard.routes"));
const swagger_1 = require("./docs/swagger");
const escolas_routes_1 = __importDefault(require("./escolas/escolas.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Rotas
app.use('/api/auth', auth_routes_1.default);
app.use('/api/dashboard', dashboard_routes_1.default);
app.use('/api/escolas', escolas_routes_1.default);
// Config Swagger
(0, swagger_1.setupSwagger)(app);
exports.default = app;
