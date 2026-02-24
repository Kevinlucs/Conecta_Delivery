
import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Printer,
  MapPin,
  Phone,
  Volume2,
  VolumeX,
  RefreshCcw,
  User,
  ShoppingBag,
  Plus,
  CreditCard,
  Banknote,
  Utensils,
  Package,
  Bike,
  CheckCircle2,
  Navigation,
  ExternalLink,
  Clock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import { Platform, OrderStatus, Order, PaymentMethod, ServiceType } from '../types';
import { STATUS_CONFIG, PLATFORM_CONFIG } from '../constants';
import PrintableReceipt from '../components/PrintableReceipt';

// Endereço provisório do backend local
const socket = io('http://localhost:3001');
const API_URL = 'http://localhost:3001/api';

const initialMockOrders: Order[] = [];

const PAYMENT_LABELS = {
  [PaymentMethod.PAID]: { label: 'Pago Online', icon: CreditCard, color: 'text-emerald-500' },
  [PaymentMethod.MONEY]: { label: 'Dinheiro', icon: Banknote, color: 'text-amber-600' },
  [PaymentMethod.PIX]: { label: 'PIX', icon: RefreshCcw, color: 'text-teal-500' },
  [PaymentMethod.DEBIT]: { label: 'Débito', icon: CreditCard, color: 'text-blue-500' },
  [PaymentMethod.CREDIT]: { label: 'Crédito', icon: CreditCard, color: 'text-blue-600' },
};

const SERVICE_LABELS = {
  [ServiceType.EAT_IN]: { label: 'No Local', icon: Utensils },
  [ServiceType.TAKEAWAY]: { label: 'Para Levar', icon: Package },
  [ServiceType.DELIVERY]: { label: 'Entrega', icon: Bike },
};

const OrdersManagement: React.FC = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Efeito de Inicialização e Socket
  React.useEffect(() => {
    // Buscar pedidos na carga inicial
    fetch(`${API_URL}/orders`)
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        if (data.length > 0 && !selectedOrderId) {
          setSelectedOrderId(data[0].id);
        }
      })
      .catch(err => console.error('Erro ao buscar pedidos:', err));

    // Listeners do WebSocket
    socket.on('new_order', (order: Order) => {
      setOrders(prev => [order, ...prev]);
      if (soundEnabled) {
        // Tocar som de notificação (Opcional: const audio = new Audio('/notif.mp3'); audio.play();)
      }
    });

    socket.on('order_status_updated', (updatedOrder: Order) => {
      setOrders(prev => prev.map(o => o.id === updatedOrder.id ? updatedOrder : o));
    });

    return () => {
      socket.off('new_order');
      socket.off('order_status_updated');
    };
  }, [soundEnabled]);

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [orders]);

  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const updateStatus = async (id: string, newStatus: OrderStatus) => {
    // Otimista
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));

    try {
      await fetch(`${API_URL}/orders/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
    } catch (err) {
      console.error('Erro ao atualizar status', err);
      // Aqui reverteria o state em um cenário ideal de tratamento de erro.
    }
  };

  return (
    <div className="h-[calc(100vh-120px)] flex gap-4 overflow-hidden">
      {/* Sidebar Filtros */}
      <div className="w-64 bg-white border border-slate-200 rounded-2xl flex flex-col shrink-0">
        <div className="p-4 border-b border-slate-200">
          <div className="flex items-center gap-2 text-slate-800 font-bold mb-4">
            <Filter size={18} />
            <span>Canais de Venda</span>
          </div>
          <div className="space-y-2">
            {['TODOS', Platform.IFOOD, Platform.WHATSAPP, Platform.MANUAL].map((p) => (
              <button key={p} className="w-full text-left px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                {p === 'TODOS' ? 'Visão Geral' : PLATFORM_CONFIG[p as Platform].label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de Pedidos */}
      <div className="flex-1 min-w-[400px] flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-slate-200 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h2 className="font-bold text-slate-900 text-lg tracking-tight flex items-center gap-2 uppercase italic">
                <Clock size={20} className="text-blue-600" />
                Fila de Pedidos
              </h2>
              <button
                onClick={() => navigate('/manual-order')}
                className="bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-blue-700 shadow-sm transition-all flex items-center gap-1.5"
              >
                <Plus size={14} />
                <span>Lançar</span>
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2 rounded-lg transition-colors text-slate-400 bg-slate-100">
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
              </button>
              <div className="px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Tempo Real</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Pesquisar pedidos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {sortedOrders.map((order) => {
            const status = STATUS_CONFIG[order.status];
            const platform = PLATFORM_CONFIG[order.platform];
            const isSelected = selectedOrderId === order.id;
            const pay = PAYMENT_LABELS[order.paymentMethod];
            const srv = SERVICE_LABELS[order.serviceType];

            return (
              <div
                key={order.id}
                onClick={() => setSelectedOrderId(order.id)}
                className={`
                  relative border rounded-2xl p-4 transition-all duration-200 cursor-pointer
                  ${isSelected ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-slate-200 hover:bg-slate-50 shadow-sm'}
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`p-1.5 rounded-lg ${platform.color} text-white`}>
                      <platform.icon size={14} />
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-sm">{order.orderNumber}</h3>
                      <p className="text-[10px] text-slate-400 font-black uppercase">{new Date(order.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                  <span className={`px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-widest ${status.color}`}>
                    {status.label}
                  </span>
                </div>

                <div className="mb-2">
                  <p className="text-sm font-bold text-slate-800">{order.customerName}</p>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1">
                    <div className="flex items-center gap-1 text-[10px] font-black text-slate-500 uppercase">
                      <srv.icon size={10} />
                      {srv.label} {order.tableNumber && `• MESA ${order.tableNumber}`}
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-black uppercase ${pay.color}`}>
                      <pay.icon size={10} />
                      {pay.label}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-200/50">
                  <span className="text-[10px] text-slate-400 font-black">TOTAL</span>
                  <span className="font-black text-slate-900 text-sm italic">R$ {order.total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detalhes do Pedido */}
      <div className="w-[480px] bg-white border border-slate-200 rounded-3xl flex flex-col shrink-0 overflow-hidden shadow-2xl shadow-slate-300/30">
        {selectedOrder ? (
          <>
            <div className="p-6 border-b border-slate-200 bg-slate-50/50">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-2xl ${PLATFORM_CONFIG[selectedOrder.platform].color} text-white shadow-xl`}>
                    {React.createElement(PLATFORM_CONFIG[selectedOrder.platform].icon, { size: 28 })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter italic uppercase">{selectedOrder.orderNumber}</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{new Date(selectedOrder.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })} • CANAL {PLATFORM_CONFIG[selectedOrder.platform].label}</p>
                  </div>
                </div>
                <button
                  onClick={() => window.print()}
                  className="p-3 bg-white border border-slate-200 rounded-2xl shadow-sm hover:bg-slate-50 text-slate-600 transition-all"
                >
                  <Printer size={22} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-slate-100">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Cliente</label>
                  <p className="text-sm font-bold text-slate-900 truncate">{selectedOrder.customerName}</p>
                </div>
                <div className="bg-white p-4 rounded-2xl border border-slate-100">
                  <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block mb-1">Localização</label>
                  <p className="text-sm font-bold text-slate-900 truncate">
                    {selectedOrder.tableNumber ? `Mesa ${selectedOrder.tableNumber}` : selectedOrder.serviceType === ServiceType.DELIVERY ? 'Delivery' : 'Para Levar'}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest italic">Resumo da Ordem</h3>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase ${PAYMENT_LABELS[selectedOrder.paymentMethod].color} bg-slate-50 border border-slate-100`}>
                  {React.createElement(PAYMENT_LABELS[selectedOrder.paymentMethod].icon, { size: 12 })}
                  {PAYMENT_LABELS[selectedOrder.paymentMethod].label}
                </div>
              </div>

              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex gap-4 items-center">
                      <div className="bg-slate-50 text-slate-900 font-black text-xs w-8 h-8 rounded-xl flex items-center justify-center border border-slate-100">
                        {item.quantity}x
                      </div>
                      <span className="text-sm font-bold text-slate-800">{item.name}</span>
                    </div>
                    <span className="text-sm font-black text-slate-900 italic">R$ {(item.price * item.quantity).toFixed(2).replace('.', ',')}</span>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-slate-200 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-black text-slate-900 tracking-tighter uppercase italic">Total Bruto</span>
                  <span className="text-4xl font-black text-blue-600 tracking-tighter">R$ {selectedOrder.total.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
            </div>

            <div className="p-8 bg-white border-t border-slate-200 space-y-4">
              {selectedOrder.status === OrderStatus.PENDING && (
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => updateStatus(selectedOrder.id, OrderStatus.CANCELLED)} className="py-4 bg-white border-2 border-slate-100 text-slate-400 text-xs font-black uppercase rounded-2xl hover:border-rose-200 hover:text-rose-500 transition-all">
                    Recusar
                  </button>
                  <button onClick={() => updateStatus(selectedOrder.id, OrderStatus.PREPARING)} className="py-4 bg-blue-600 text-white text-xs font-black uppercase rounded-2xl hover:bg-blue-700 shadow-2xl shadow-blue-200 transition-all">
                    Confirmar Pedido
                  </button>
                </div>
              )}

              {selectedOrder.status === OrderStatus.PREPARING && (
                <button onClick={() => updateStatus(selectedOrder.id, OrderStatus.READY)} className="w-full py-5 bg-emerald-500 text-white text-xs font-black uppercase rounded-2xl hover:bg-emerald-600 shadow-2xl shadow-emerald-100 flex items-center justify-center gap-3 transition-all">
                  <CheckCircle2 size={20} />
                  Marcar como Pronto
                </button>
              )}

              {selectedOrder.status === OrderStatus.READY && (
                <>
                  {selectedOrder.platform === Platform.IFOOD ? (
                    <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <ShoppingBag size={20} className="text-rose-600" />
                        <div>
                          <p className="text-xs font-black text-rose-700 uppercase italic">Aguardando iFood</p>
                          <p className="text-[10px] font-bold text-rose-500">Sincronização via API Automática</p>
                        </div>
                      </div>
                      <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></div>
                    </div>
                  ) : (
                    <button onClick={() => updateStatus(selectedOrder.id, OrderStatus.DELIVERING)} className="w-full py-5 bg-purple-600 text-white text-xs font-black uppercase rounded-2xl hover:bg-purple-700 shadow-2xl shadow-purple-100 flex items-center justify-center gap-3 transition-all">
                      <Navigation size={20} className="rotate-90" />
                      Saiu para Entrega / Rota
                    </button>
                  )}
                </>
              )}

              {selectedOrder.status === OrderStatus.DELIVERING && (
                <>
                  {selectedOrder.platform === Platform.IFOOD ? (
                    <div className="p-5 bg-blue-50 border border-blue-100 rounded-2xl flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bike size={20} className="text-blue-600" />
                          <p className="text-xs font-black text-blue-700 uppercase">iFood em Rota</p>
                        </div>
                        <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Live API</span>
                      </div>
                      <button className="w-full py-2 bg-white border border-blue-100 text-blue-600 text-[10px] font-black uppercase rounded-xl hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                        <ExternalLink size={14} />
                        Rastrear no iFood
                      </button>
                    </div>
                  ) : (
                    <button onClick={() => updateStatus(selectedOrder.id, OrderStatus.DELIVERED)} className="w-full py-5 bg-blue-600 text-white text-xs font-black uppercase rounded-2xl hover:bg-blue-700 shadow-2xl shadow-blue-200 flex items-center justify-center gap-3 transition-all">
                      <Bike size={20} />
                      Confirmar Entrega Manual
                    </button>
                  )}
                </>
              )}

              {selectedOrder.status === OrderStatus.DELIVERED && (
                <div className="flex flex-col items-center justify-center p-6 bg-slate-50 border border-slate-100 rounded-3xl text-slate-400 gap-2">
                  <CheckCircle2 size={24} className="text-emerald-500" />
                  <p className="text-[11px] font-black text-slate-500 uppercase tracking-[0.2em] italic">Pedido Concluído</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30">
            <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 border-4 border-dashed border-slate-200">
              <ShoppingBag size={40} className="text-slate-200" />
            </div>
            <h3 className="text-xl font-black text-slate-900 tracking-tighter italic uppercase">Gerenciador de Ordens</h3>
            <p className="text-sm text-slate-400 font-bold max-w-[250px] mx-auto mt-3">Escolha um pedido na lista ao lado para iniciar a gestão do fluxo.</p>
          </div>
        )}
      </div>

      {/* Componente Invisível de Impressão */}
      <PrintableReceipt order={selectedOrder || null} />
    </div>
  );
};

export default OrdersManagement;
