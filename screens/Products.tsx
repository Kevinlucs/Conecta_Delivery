
import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit2, 
  Trash2, 
  MessageCircle, 
  ShoppingBag,
  MoreVertical,
  Image as ImageIcon
} from 'lucide-react';
import { Product } from '../types';

const mockProducts: Product[] = [
  { id: '1', name: 'Hambúrguer de Carne Clássico', category: 'Hambúrgueres', price: 12.90, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop', available: true, syncStatus: { ifood: true, whatsapp: true } },
  { id: '2', name: 'X-Salada Especial', category: 'Hambúrgueres', price: 15.50, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=200&h=200&fit=crop', available: true, syncStatus: { ifood: true, whatsapp: true } },
  { id: '3', name: 'Batata Frita Grande', category: 'Acompanhamentos', price: 6.00, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=200&h=200&fit=crop', available: true, syncStatus: { ifood: true, whatsapp: true } },
  { id: '4', name: 'Pão de Alho (6 unid)', category: 'Acompanhamentos', price: 4.50, image: 'https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?w=200&h=200&fit=crop', available: false, syncStatus: { ifood: false, whatsapp: true } },
  { id: '5', name: 'Coca-Cola 500ml', category: 'Bebidas', price: 3.50, image: 'https://images.unsplash.com/photo-1622483767028-3f66f32aef97?w=200&h=200&fit=crop', available: true, syncStatus: { ifood: true, whatsapp: true } },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Cardápio Interno</h1>
          <p className="text-slate-500 text-sm">Gerencie os itens utilizados para pedidos manuais e balcão.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all">
          <Plus size={18} />
          <span>Novo Produto</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou código..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors">
              <Filter size={18} className="text-slate-400" />
              Categorias
            </button>
            <div className="h-10 w-px bg-slate-200 hidden md:block mx-1"></div>
            <button className="flex-1 md:flex-none px-4 py-2.5 text-sm font-bold text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
              Importar iFood
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-[11px] font-bold uppercase tracking-wider">
                <th className="px-6 py-4">Produto</th>
                <th className="px-6 py-4">Categoria</th>
                <th className="px-6 py-4">Preço Balcão</th>
                <th className="px-6 py-4">Disponibilidade</th>
                <th className="px-6 py-4">Sincronização</th>
                <th className="px-6 py-4 text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {mockProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl overflow-hidden border border-slate-200 shrink-0">
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900">{p.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">REF: {p.id.padStart(4, '0')}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase tracking-wider border border-blue-100">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">R$ {p.price.toFixed(2).replace('.', ',')}</td>
                  <td className="px-6 py-4">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked={p.available} className="sr-only peer" />
                      <div className="w-10 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                      <span className="ml-3 text-xs font-bold text-slate-500">{p.available ? 'Disponível' : 'Esgotado'}</span>
                    </label>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div title="WhatsApp" className={`p-1.5 rounded-lg border ${p.syncStatus.whatsapp ? 'border-emerald-100 bg-emerald-50 text-emerald-500' : 'border-slate-100 bg-slate-50 text-slate-300'}`}>
                        <MessageCircle size={14} />
                      </div>
                      <div title="iFood" className={`p-1.5 rounded-lg border ${p.syncStatus.ifood ? 'border-rose-100 bg-rose-50 text-rose-500' : 'border-slate-100 bg-slate-50 text-slate-300'}`}>
                        <ShoppingBag size={14} />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl">
          <h3 className="text-emerald-800 font-bold text-sm mb-2">Sincronização Ativa</h3>
          <p className="text-emerald-600 text-xs leading-relaxed">Seu cardápio está 95% sincronizado com as plataformas externas. 2 itens precisam de atenção.</p>
        </div>
        <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl">
          <h3 className="text-blue-800 font-bold text-sm mb-2">Impressão de Comanda</h3>
          <p className="text-blue-600 text-xs leading-relaxed">Itens do cardápio interno são formatados automaticamente para impressoras térmicas de 80mm.</p>
        </div>
        <div className="bg-amber-50 border border-amber-100 p-6 rounded-2xl">
          <h3 className="text-amber-800 font-bold text-sm mb-2">Dica Pro</h3>
          <p className="text-amber-600 text-xs leading-relaxed">Mantenha os preços balcão atualizados para que os relatórios de ticket médio sejam precisos.</p>
        </div>
      </div>
    </div>
  );
}
