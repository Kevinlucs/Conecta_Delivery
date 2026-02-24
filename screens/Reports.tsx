
import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Calendar, 
  Download, 
  ChevronDown, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Filter
} from 'lucide-react';

const revenueData = [
  { name: 'Seg', total: 2400 },
  { name: 'Ter', total: 3100 },
  { name: 'Qua', total: 2800 },
  { name: 'Qui', total: 3900 },
  { name: 'Sex', total: 4800 },
  { name: 'Sáb', total: 6100 },
  { name: 'Dom', total: 5400 },
];

const platformData = [
  { name: 'iFood', value: 45, color: '#e11d48' },
  { name: 'WhatsApp', value: 35, color: '#10b981' },
  { name: 'Manual', value: 20, color: '#64748b' },
];

const topProducts = [
  { name: 'Burguer Clássico', orders: 154, revenue: 1848 },
  { name: 'Batata Frita', orders: 128, revenue: 576 },
  { name: 'Pizza Mussarela', orders: 92, revenue: 2208 },
  { name: 'Coca-Cola 500ml', orders: 84, revenue: 252 },
  { name: 'Anéis de Cebola', orders: 45, revenue: 270 },
];

const Reports: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Relatórios & Métricas</h1>
          <p className="text-slate-500 text-sm">Analise o desempenho e tendências do seu restaurante.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 shadow-sm transition-all">
            <Calendar size={18} className="text-slate-400" />
            <span>01 Out - 31 Out, 2023</span>
            <ChevronDown size={14} className="text-slate-400" />
          </div>
          <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg text-sm font-semibold hover:bg-blue-700 shadow-sm transition-all">
            <Download size={18} />
            <span>Exportar</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Faturamento Total', value: 'R$ 32.450,00', trend: 14.2, up: true },
          { label: 'Total de Pedidos', value: '1.284', trend: 8.1, up: true },
          { label: 'Ticket Médio', value: 'R$ 25,27', trend: 3.4, up: false },
          { label: 'Novos Clientes', value: '456', trend: 22.5, up: true }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <p className="text-sm font-medium text-slate-500 mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-bold text-slate-900">{kpi.value}</p>
              <div className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-lg ${kpi.up ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                {kpi.up ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {kpi.trend}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-slate-900 flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" />
              Tendência de Faturamento
            </h3>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-blue-600"></div> Esta Semana</span>
              <span className="flex items-center gap-2"><div className="w-3 h-3 rounded-full bg-slate-200"></div> Semana Passada</span>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                <Tooltip 
                  formatter={(value: any) => [`R$ ${value}`, 'Faturamento']}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  itemStyle={{ fontWeight: 'bold' }}
                />
                <Line type="monotone" dataKey="total" stroke="#2563eb" strokeWidth={4} dot={{r: 4, strokeWidth: 2, fill: '#fff'}} activeDot={{r: 6}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-900 mb-8">Pedidos por Plataforma</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={platformData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {platformData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-4 mt-4">
            {platformData.map((p, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{backgroundColor: p.color}}></div>
                  <span className="text-sm font-medium text-slate-600">{p.name}</span>
                </div>
                <span className="text-sm font-bold text-slate-900">{p.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <h3 className="font-bold text-slate-900">Produtos Mais Vendidos</h3>
          <button className="flex items-center gap-2 text-sm font-bold text-blue-600">
            <Filter size={14} />
            Filtrar por Categoria
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Nome do Produto</th>
                <th className="px-6 py-4">Total Pedidos</th>
                <th className="px-6 py-4">Receita</th>
                <th className="px-6 py-4">Tendência</th>
                <th className="px-6 py-4 text-right">Performance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {topProducts.map((product, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-bold text-slate-900">{product.name}</td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">{product.orders}</td>
                  <td className="px-6 py-4 font-bold text-slate-900">R$ {product.revenue.toFixed(2).replace('.', ',')}</td>
                  <td className="px-6 py-4">
                    <span className="flex items-center gap-1 text-emerald-600 text-xs font-bold">
                      <ArrowUpRight size={14} />
                      12%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end">
                      <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 h-full" style={{width: `${Math.random() * 60 + 40}%`}}></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;
