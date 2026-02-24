import { Request, Response } from 'express';
import { prisma } from '../server';

export const getOrders = async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: true,
                customer: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        res.json(orders);
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
};

export const createManualOrder = async (req: Request, res: Response) => {
    try {
        const {
            tenantId,
            customerName,
            total,
            paymentMethod,
            serviceType,
            items,
            platform = 'MANUAL',
            status = 'PENDING',
            tableNumber
        } = req.body;

        const orderNumber = `#${Math.floor(1000 + Math.random() * 9000)}`;

        const order = await prisma.order.create({
            data: {
                tenantId,
                orderNumber,
                platform,
                status,
                customerName,
                total,
                paymentMethod,
                serviceType,
                tableNumber,
                items: {
                    create: items.map((item: any) => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        productId: item.productId
                    }))
                }
            },
            include: {
                items: true
            }
        });

        // Notificar painel via socket.io
        const io = (req as any).io;
        if (io) {
            io.emit('new_order', order);
        }

        res.status(201).json(order);
    } catch (error) {
        console.error('Erro ao criar pedido manual:', error);
        res.status(500).json({ error: 'Erro ao criar pedido' });
    }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const { status } = req.body;

        const order = await prisma.order.update({
            where: { id },
            data: { status },
            include: { items: true }
        });

        // Notificar painel via socket.io e possiveis integrações (wpp/ifood)
        const io = (req as any).io;
        if (io) {
            io.emit('order_status_updated', order);
        }

        res.json(order);
    } catch (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        res.status(500).json({ error: 'Erro ao atualizar status' });
    }
};
