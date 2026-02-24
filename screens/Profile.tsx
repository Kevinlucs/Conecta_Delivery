
import React from 'react';
import { User, Mail, Shield, CreditCard, LogOut, Camera } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">Configurações da Conta</h1>
        <button 
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-rose-600 font-bold text-sm hover:bg-rose-50 px-4 py-2 rounded-xl transition-all"
        >
          <LogOut size={18} />
          Sair do Sistema
        </button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-200 flex flex-col md:flex-row items-center gap-8">
          <div className="relative">
            <div className="w-24 h-24 bg-blue-100 rounded-3xl flex items-center justify-center text-blue-600 font-black text-3xl shadow-xl shadow-blue-50 border-4 border-white">
              JB
            </div>
            <button className="absolute -right-2 -bottom-2 p-2 bg-white border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50 shadow-md">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center md:text-left flex-1">
            <h2 className="text-2xl font-bold text-slate-900">João Burguer</h2>
            <p className="text-slate-500 font-medium">joao@burguerdojoao.com.br • Administrador</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold border border-emerald-100">Conta Verificada</span>
              <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold border border-blue-100">Plano Pro</span>
            </div>
          </div>
          <button className="px-6 py-2.5 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-800 transition-all">
            Atualizar Perfil
          </button>
        </div>

        <div className="p-8 space-y-8">
          <section>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Configurações de Segurança</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Endereço de E-mail</label>
                 <div className="relative">
                   <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input type="email" readOnly defaultValue="joao@burguerdojoao.com.br" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-sm font-bold text-slate-700">Senha</label>
                 <div className="relative">
                   <Shield className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                   <input type="password" value="********" readOnly className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-500 cursor-not-allowed" />
                   <button className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:underline">Alterar</button>
                 </div>
               </div>
            </div>
          </section>

          <section className="pt-8 border-t border-slate-100">
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Assinatura e Cobrança</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <div className="p-3 bg-white border border-slate-200 rounded-xl text-blue-600 shadow-sm">
                   <CreditCard size={24} />
                 </div>
                 <div>
                   <p className="text-sm font-bold text-slate-900">Próxima Fatura: 15 Nov, 2023</p>
                   <p className="text-xs text-slate-500 font-medium">Plano Padrão Mensal • R$ 149,00/mês</p>
                 </div>
               </div>
               <button className="text-sm font-bold text-blue-600 hover:underline">Gerenciar Pagamento</button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
