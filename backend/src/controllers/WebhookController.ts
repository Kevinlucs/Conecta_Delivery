import { Request, Response } from 'express';
import { prisma } from '../server';

export const ifoodWebhook = async (req: Request, res: Response) => {
    try {
        const payload = req.body;
        // O payload do webhook real do iFood seria muito mais complexo.
        // Aqui estamos simulando um payload simplificado que vira um Order.

        const orderNumber = payload.displayId || `#${Math.floor(1000 + Math.random() * 9000)}`;

        const order = await prisma.order.create({
            data: {
                tenantId: payload.tenantId,
                orderNumber,
                platform: 'IFOOD',
                status: 'PENDING',
                customerName: payload.customer?.name || 'Cliente iFood',
                total: payload.total || 0,
                paymentMethod: payload.payment?.method || 'PAID',
                serviceType: payload.orderType === 'DELIVERY' ? 'DELIVERY' : 'TAKEAWAY',
                address: payload.delivery?.deliveryAddress ? JSON.stringify(payload.delivery.deliveryAddress) : null,
                notes: payload.observations,
                items: {
                    create: payload.items?.map((item: any) => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })) || []
                }
            },
            include: {
                items: true
            }
        });

        // Notificar frontend
        const io = (req as any).io;
        if (io) {
            io.emit('new_order', order);
        }

        res.status(200).json({ success: true, message: 'iFood webhook processado', orderId: order.id });
    } catch (error) {
        console.error('Erro no webhook ifood:', error);
        res.status(500).json({ error: 'Erro processando ifood webhook' });
    }
};

export const evolutionWebhook = async (req: Request, res: Response) => {
    try {
        const payload = req.body;

        // Na evolution API, payloads de "MESSAGES_UPSERT" podem ser mensagens que representam pedidos formatados
        // ou se usando Typebot, enviaremos via API direto do Typebot.
        // Simulação: Typebot/Evolution já entregou o objeto do pedido na rota webhook

        if (payload.event !== 'ORDER_CREATED') {
            res.status(400).json({ message: 'Evento ignorado' });
            return;
        }

        const data = payload.data;
        const orderNumber = `#W-${Math.floor(1000 + Math.random() * 9000)}`;

        const order = await prisma.order.create({
            data: {
                tenantId: data.tenantId,
                orderNumber,
                platform: 'WHATSAPP',
                status: 'PENDING',
                customerName: data.customerName,
                total: data.total || 0,
                paymentMethod: data.paymentMethod || 'PIX',
                serviceType: data.serviceType || 'DELIVERY',
                address: data.address,
                items: {
                    create: data.items?.map((item: any) => ({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price
                    })) || []
                }
            },
            include: {
                items: true
            }
        });

        // Notificar frontend
        const io = (req as any).io;
        if (io) {
            io.emit('new_order', order);
        }

        res.status(200).json({ success: true, message: 'WhatsApp webhook processado' });
    } catch (error) {
        console.error('Erro no webhook whatsapp:', error);
        res.status(500).json({ error: 'Erro processando whatsapp webhook' });
    }
};
