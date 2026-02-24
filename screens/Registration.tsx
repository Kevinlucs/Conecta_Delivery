
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Building2, Sliders, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const Registration: React.FC = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const steps = [
    { id: 1, label: 'Dados do Dono', icon: User },
    { id: 2, label: 'Sobre o Negócio', icon: Building2 },
    { id: 3, label: 'Configuração Inicial', icon: Sliders },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="p-8 flex items-center justify-between max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xs">CD</span>
          </div>
          <span className="font-black text-slate-900 tracking-tight">CONECTA DELIVERY</span>
        </div>
        <button 
          onClick={() => navigate('/login')}
          className="text-sm font-bold text-slate-600 hover:text-slate-900"
        >
          Já tem conta? Entrar
        </button>
      </header>

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-8 py-6 border-b border-slate-200">
            <div className="flex items-center justify-between">
              {steps.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300
                    ${step > s.id ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-200' : step === s.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-white border border-slate-200 text-slate-400'}
                  `}>
                    {step > s.id ? <Check size={20} /> : <s.icon size={20} />}
                  </div>
                  <div className="hidden sm:block">
                    <p className={`text-[10px] font-bold uppercase tracking-wider ${step === s.id ? 'text-blue-600' : 'text-slate-400'}`}>Passo 0{s.id}</p>
                    <p className={`text-sm font-bold ${step === s.id ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</p>
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-8 h-px bg-slate-200 mx-4 hidden lg:block"></div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-8 h-1 bg-slate-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600 transition-all duration-500" 
                style={{ width: `${(step / steps.length) * 100}%` }}
              ></div>
            </div>
          </div>

          <div className="p-8 lg:p-12">
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Informações Pessoais</h2>
                  <p className="text-slate-500 text-sm mt-1">Conte-nos sobre você, o proprietário da conta.</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nome Completo</label>
                    <input type="text" placeholder="João da Silva" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Telefone/WhatsApp</label>
                    <input type="tel" placeholder="(11) 99999-9999" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">E-mail</label>
                  <input type="email" placeholder="joao@exemplo.com.br" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Criar Senha</label>
                  <input type="password" placeholder="••••••••" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Detalhes do Negócio</h2>
                  <p className="text-slate-500 text-sm mt-1">Informações sobre seu restaurante ou loja.</p>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Nome Fantasia</label>
                  <input type="text" placeholder="Burguer do João" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">CNPJ</label>
                    <input type="text" placeholder="00.000.000/0001-00" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Tipo de Culinária</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20">
                      <option>Pizza</option>
                      <option>Hambúrguer</option>
                      <option>Sushi</option>
                      <option>Brasileira</option>
                      <option>Outros</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Endereço Completo</label>
                  <input type="text" placeholder="Rua, Número, Bairro, Cidade" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900">Configurar Operação</h2>
                  <p className="text-slate-500 text-sm mt-1">Vamos definir como você trabalha.</p>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Auto-Confirmar Pedidos', desc: 'Confirmar pedidos do iFood automaticamente.', id: 'auto' },
                    { title: 'Alertas Sonoros', desc: 'Tocar um som quando chegar novo pedido.', id: 'sound' },
                    { title: 'Impressão Automática', desc: 'Imprimir vias assim que o pedido for confirmado.', id: 'print' },
                  ].map((config) => (
                    <label key={config.id} className="flex items-center justify-between p-4 bg-slate-50 border border-slate-200 rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
                      <div>
                        <p className="text-sm font-bold text-slate-900">{config.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{config.desc}</p>
                      </div>
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-between mt-12 pt-8 border-t border-slate-200">
              <button 
                disabled={step === 1}
                onClick={() => setStep(step - 1)}
                className={`flex items-center gap-2 text-sm font-bold ${step === 1 ? 'text-slate-300' : 'text-slate-600 hover:text-slate-900'}`}
              >
                <ArrowLeft size={18} />
                Voltar
              </button>
              <button 
                onClick={() => {
                  if (step < 3) setStep(step + 1);
                  else navigate('/dashboard');
                }}
                className="flex items-center gap-2 bg-blue-600 text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all"
              >
                {step === 3 ? 'Finalizar e Acessar' : 'Continuar'}
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Registration;
