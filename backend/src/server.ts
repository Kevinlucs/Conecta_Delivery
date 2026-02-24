import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*', // Ajustar para o domínio do React na produção
        methods: ['GET', 'POST']
    }
});

export const prisma = new PrismaClient();

app.use(cors());
app.use(express.json());

import orderRoutes from './routes/orderRoutes';
import webhookRoutes from './routes/webhookRoutes';

// Middlewares para passar o socket.io nas rotas
app.use((req, res, next) => {
    (req as any).io = io;
    next();
});

// Registrar rotas
app.use('/api', orderRoutes);
app.use('/api', webhookRoutes);

// Socket.io eventos (Tempo real)
io.on('connection', (socket) => {
    console.log(`📡 Novo cliente conectado: ${socket.id}`);

    socket.on('disconnect', () => {
        console.log(`🔌 Cliente desconectado: ${socket.id}`);
    });
});

// Rotas básicas
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Conecta Delivery API rodando!' });
});

// Inicializando
const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});
