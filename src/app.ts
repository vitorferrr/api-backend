import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './auth/auth.routes';
import dashboardRoutes from './dashboard/dashboard.routes';
import { setupSwagger } from './docs/swagger';
import escolasRoutes from './escolas/escolas.routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/escolas', escolasRoutes);

// Config Swagger
setupSwagger(app);

export default app;