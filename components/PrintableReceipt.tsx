import React from 'react';
import { Order, PaymentMethod, ServiceType } from '../types';
import { PLATFORM_CONFIG } from '../constants';

interface PrintableReceiptProps {
    order: Order | null;
}

const PAYMENT_LABELS = {
    [PaymentMethod.PAID]: 'Pago Online',
    [PaymentMethod.MONEY]: 'Dinheiro',
    [PaymentMethod.PIX]: 'PIX',
    [PaymentMethod.DEBIT]: 'Cartão Débito',
    [PaymentMethod.CREDIT]: 'Cartão Crédito',
};

const SERVICE_LABELS = {
    [ServiceType.EAT_IN]: 'No Local',
    [ServiceType.TAKEAWAY]: 'Para Levar',
    [ServiceType.DELIVERY]: 'Entrega',
};

const PrintableReceipt: React.FC<PrintableReceiptProps> = ({ order }) => {
    if (!order) return null;

    return (
        <div className="printable-receipt">
            <div className="receipt-header">
                <h1>CONECTA DELIVERY</h1>
                <p>Rua Exemplo, 123 - Centro</p>
                <p>Tel: (11) 9999-9999</p>
                <div className="divider">================================</div>
            </div>

            <div className="receipt-info">
                <h2 className="receipt-order-number">PEDIDO {order.orderNumber}</h2>
                <p>Data: {new Date(order.createdAt).toLocaleString('pt-BR')}</p>
                <p>Canal: {PLATFORM_CONFIG[order.platform].label}</p>
                <p>Cliente: {order.customerName}</p>
                {order.phoneNumber && <p>Tel: {order.phoneNumber}</p>}
                {order.serviceType === ServiceType.DELIVERY && order.address && (
                    <p>End.: {order.address}</p>
                )}
                {order.serviceType === ServiceType.EAT_IN && order.tableNumber && (
                    <p>Mesa: {order.tableNumber}</p>
                )}
                <p>Tipo: {SERVICE_LABELS[order.serviceType]}</p>
            </div>

            <div className="divider">================================</div>

            <div className="receipt-items">
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'left' }}>Qtd</th>
                            <th style={{ textAlign: 'left' }}>Item</th>
                            <th style={{ textAlign: 'right' }}>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {order.items.map((item, idx) => (
                            <tr key={idx}>
                                <td>{item.quantity}x</td>
                                <td>{item.name}</td>
                                <td style={{ textAlign: 'right' }}>R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="divider">================================</div>

            <div className="receipt-totals">
                <p>Pagamento: {PAYMENT_LABELS[order.paymentMethod]}</p>
                <h2 style={{ textAlign: 'right', marginTop: '10px' }}>TOTAL: R$ {order.total.toFixed(2).replace('.', ',')}</h2>
            </div>

            <div className="receipt-footer">
                <div className="divider">================================</div>
                <p>Obrigado pela preferência!</p>
                <p>Desenvolvido por Conecta Delivery</p>
                <br />
                <br />
                <br />
                {/* Espaço extra para corte da guilhotina da impressora */}
            </div>
        </div>
    );
};

export default PrintableReceipt;
