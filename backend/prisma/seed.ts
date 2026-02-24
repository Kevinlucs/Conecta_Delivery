import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('Iniciando o seed do banco de dados...');

    // 1. Criar um Tenant (Restaurante)
    const tenant = await prisma.tenant.create({
        data: {
            name: 'Conecta Delivery - Loja Matriz',
        },
    });
    console.log(`✅ Tenant criado: ${tenant.name} (${tenant.id})`);

    // 2. Criar Produtos Padrão
    const p1 = await prisma.product.create({
        data: {
            tenantId: tenant.id,
            name: 'Hambúrguer Clássico',
            category: 'Lanches',
            price: 15.90,
            available: true,
            syncIfood: true,
            syncWpp: true
        }
    });

    const p2 = await prisma.product.create({
        data: {
            tenantId: tenant.id,
            name: 'Batata Frita G',
            category: 'Porções',
            price: 12.00,
            available: true,
            syncIfood: true,
            syncWpp: true
        }
    });

    const p3 = await prisma.product.create({
        data: {
            tenantId: tenant.id,
            name: 'Coca-Cola Lata 350ml',
            category: 'Bebidas',
            price: 5.50,
            available: true,
            syncIfood: true,
            syncWpp: true
        }
    });
    console.log('✅ Produtos catálogo padrão criados');

    // 3. Criar Pedidos Mock para Povoar a Tela (como se fosse Wpp e Ifood)
    const order1 = await prisma.order.create({
        data: {
            tenantId: tenant.id,
            orderNumber: '#0025',
            platform: 'WHATSAPP',
            status: 'PENDING',
            customerName: 'Aline Freitas',
            total: 33.40,
            paymentMethod: 'PIX',
            serviceType: 'DELIVERY',
            address: 'Rua das Flores, 456 - São Caetano',
            items: {
                create: [
                    { name: p1.name, productId: p1.id, quantity: 1, price: p1.price },
                    { name: p2.name, productId: p2.id, quantity: 1, price: p2.price },
                    { name: p3.name, productId: p3.id, quantity: 1, price: p3.price }
                ]
            }
        }
    });

    const order2 = await prisma.order.create({
        data: {
            tenantId: tenant.id,
            orderNumber: '#0026',
            platform: 'IFOOD',
            status: 'PREPARING',
            customerName: 'Roberto Sousa',
            total: 15.90,
            paymentMethod: 'PAID',
            serviceType: 'DELIVERY',
            address: 'Avenida Brasil, 900',
            items: {
                create: [
                    { name: p1.name, productId: p1.id, quantity: 1, price: p1.price }
                ]
            }
        }
    });
    console.log('✅ Pedidos de teste criados');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
