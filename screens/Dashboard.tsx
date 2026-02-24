
import React from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  Star, 
  ArrowUpRight, 
  ArrowDownRight
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Platform, OrderStatus } from '../types';
import { STATUS_CONFIG, PLATFORM_CONFIG } from '../constants';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  const metrics = [
    { label: "Pedidos de Hoje", value: "128", trend: 12.5, icon: ShoppingBag, color: "text-blue-600", bg: "bg-blue-50", info: "Volume total diário" },
    { label: "Faturamento Total", value: "R$ 4.250,00", trend: 8.2, icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50", info: "Baseado em todos os pedidos" },
    { label: "Avaliação Média", value: "4.8", trend: -2.1, icon: Star, color: "text-amber-600", bg: "bg-amber-50", info: "Baseado somente no iFood" },
    { label: "Pedidos Pendentes", value: "14", trend: 0, icon: Users, color: "text-rose-600", bg: "bg-rose-50", info: "Aguardando confirmação" },
  ];

  const recentOrders = [
    { id: '1', orderNo: '#1024', customer: 'Aline Souza', total: 45.90, status: OrderStatus.PREPARING, platform: Platform.IFOOD, time: '5m atrás' },
    { id: '2', orderNo: '#1023', customer: 'Roberto Silva', total: 28.50, status: OrderStatus.READY, platform: Platform.WHATSAPP, time: '12m atrás' },
    { id: '3', orderNo: '#1022', customer: 'Carlos Oliveira', total: 112.00, status: OrderStatus.DELIVERED, platform: Platform.MANUAL, time: '45m atrás' },
    { id: '4', orderNo: '#1021', customer: 'Daniela Lima', total: 34.20, status: OrderStatus.PENDING, platform: Platform.IFOOD, time: '1h atrás' },
    { id: '5', orderNo: '#1020', customer: 'Eduardo Pereira', total: 19.99, status: OrderStatus.DELIVERED, platform: Platform.WHATSAPP, time: '2h atrás' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Painel Geral</h1>
          <p className="text-slate-500 text-sm">Bem-vindo de volta, João. Veja o resumo do dia.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${metric.bg} ${metric.color}`}>
                <metric.icon size={24} />
              </div>
              {metric.trend !== 0 && (
                <div className={`flex items-center gap-1 text-xs font-bold ${metric.trend > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {metric.trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {Math.abs(metric.trend)}%
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-medium text-slate-500 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-slate-900">{metric.value}</p>
              <p className="text-[10px] text-slate-400 font-medium mt-1 uppercase tracking-tight italic">{metric.info}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h2 className="font-bold text-slate-900">Pedidos Recentes</h2>
          <button 
            onClick={() => navigate('/orders')}
            className="text-sm font-semibold text-blue-600 hover:text-blue-700"
          >
            Ver todos
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Nº Pedido</th>
                <th className="px-6 py-4">Cliente</th>
                <th className="px-6 py-4">Plataforma</th>
                <th className="px-6 py-4">Total</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Tempo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentOrders.map((order) => {
                const status = STATUS_CONFIG[order.status];
                const platform = PLATFORM_CONFIG[order.platform];
                return (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <span className="font-bold text-slate-900">{order.orderNo}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-slate-700">{order.customer}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <platform.icon size={16} className={order.platform === Platform.IFOOD ? 'text-rose-600' : 'text-emerald-500'} />
                        <span className="text-xs font-semibold text-slate-600">{platform.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-slate-900">
                      R$ {order.total.toFixed(2).replace('.', ',')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${status.color}`}>
                        {status.label}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-400 font-medium">
                      {order.time}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
