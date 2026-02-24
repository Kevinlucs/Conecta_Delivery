
import React from 'react';
import { 
  MessageCircle, 
  ShoppingBag, 
  CheckCircle2, 
  AlertCircle, 
  ExternalLink,
  Smartphone,
  Key,
  Database,
  ArrowRight
} from 'lucide-react';

const Integrations: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Integrações</h1>
        <p className="text-slate-500 text-sm">Conecte seus canais de venda e centralize sua operação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Card WhatsApp */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-200 bg-emerald-50">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                <MessageCircle size={32} />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-emerald-100 shadow-sm">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Conectado</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">WhatsApp Business</h2>
            <p className="text-sm text-slate-600 leading-relaxed">Receba pedidos diretamente do seu número através do nosso chatbot inteligente.</p>
          </div>
          
          <div className="p-8 flex-1 space-y-6">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex flex-col items-center text-center">
              <div className="w-40 h-40 bg-white border-4 border-slate-100 rounded-xl flex items-center justify-center mb-4 p-2 shadow-inner">
                 <Smartphone size={100} className="text-slate-200" />
                 {/* Imagine um QR Code aqui */}
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Dispositivo Ativo</p>
              <p className="text-sm font-semibold text-slate-800">+55 (11) 98765-4321</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Status & Estatísticas</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Uptime</p>
                  <p className="text-sm font-bold text-slate-800">99.9%</p>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="text-[10px] font-bold text-slate-400 uppercase">Msgs/Dia</p>
                  <p className="text-sm font-bold text-slate-800">1.2k</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200 flex gap-4">
            <button className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <Smartphone size={16} />
              Trocar Aparelho
            </button>
            <button className="flex-1 py-3 bg-blue-600 text-white text-sm font-bold rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-200 transition-colors flex items-center justify-center gap-2">
              <Database size={16} />
              Sincronizar
            </button>
          </div>
        </div>

        {/* Card iFood */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 border-b border-slate-200 bg-rose-50">
            <div className="flex items-center justify-between mb-6">
              <div className="w-16 h-16 bg-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-200">
                <ShoppingBag size={32} />
              </div>
              <div className="flex items-center gap-2 px-3 py-1 bg-white rounded-full border border-rose-100 shadow-sm">
                <div className="w-2 h-2 bg-rose-600 rounded-full"></div>
                <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider">Desconectado</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Portal iFood</h2>
            <p className="text-sm text-slate-600 leading-relaxed">Automatize o recebimento de pedidos e sincronize seu cardápio instantaneamente.</p>
          </div>
          
          <div className="p-8 flex-1 space-y-6">
            <div className="space-y-4">
               <div>
                 <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Merchant ID</label>
                 <div className="relative">
                   <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <input type="text" placeholder="Ex: 582d0..." className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>
               </div>
               <div>
                 <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">Client Secret</label>
                 <div className="relative">
                   <AlertCircle className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                   <input type="password" placeholder="••••••••••••••••" className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                 </div>
               </div>
            </div>

            <div className="p-6 bg-slate-50 border border-slate-200 rounded-2xl">
               <h4 className="text-xs font-bold text-slate-900 mb-3 flex items-center gap-2">
                 <CheckCircle2 size={14} className="text-blue-600" />
                 Como conectar:
               </h4>
               <ul className="space-y-3">
                 {[
                   'Vá no Portal iFood > Desenvolvedores',
                   'Solicite suas credenciais de API',
                   'Cole o Merchant ID e Secret acima',
                   'Autorize o app Conecta Delivery'
                 ].map((step, i) => (
                   <li key={i} className="text-xs text-slate-600 flex gap-3">
                     <span className="w-4 h-4 rounded-full bg-slate-200 text-[10px] font-bold flex items-center justify-center shrink-0">{i+1}</span>
                     {step}
                   </li>
                 ))}
               </ul>
            </div>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200">
            <button className="w-full py-3.5 bg-rose-600 text-white text-sm font-bold rounded-xl hover:bg-rose-700 shadow-lg shadow-rose-200 transition-colors flex items-center justify-center gap-2">
              Conectar ao iFood
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Integrations;
