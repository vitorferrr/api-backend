import express from 'express';
import cors from 'cors';
import authRoutes from './auth/auth.routes';
import dashboardRoutes from './dashboard/dashboard.routes';
import { setupSwagger } from './docs/swagger';

const app = express();

app.use(cors());
app.use(express.json());

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes)

// Config Swagger
setupSwagger(app);

export default app;