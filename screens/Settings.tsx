
import React, { useState } from 'react';
import { 
  Building, 
  Clock, 
  Truck, 
  Bell, 
  Printer, 
  Save, 
  Globe, 
  MapPin, 
  Phone 
} from 'lucide-react';

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('business');

  const tabs = [
    { id: 'business', label: 'Dados da Empresa', icon: Building },
    { id: 'hours', label: 'Horários de Funcionamento', icon: Clock },
    { id: 'delivery', label: 'Config. de Entrega', icon: Truck },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'print', label: 'Impressão', icon: Printer },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Configurações</h1>
        <p className="text-slate-500 text-sm">Configure a identidade e as regras operacionais do seu restaurante.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-64 shrink-0">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-2 flex flex-col gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <tab.icon size={18} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
          <div className="p-8 flex-1 space-y-8">
            {activeTab === 'business' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nome do Restaurante</label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="text" defaultValue="Burguer do João" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Site Oficial</label>
                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input type="url" defaultValue="https://burguerdojoao.com.br" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Telefone Principal</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="tel" defaultValue="+55 (11) 98765-4321" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">Endereço</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <textarea rows={3} defaultValue="Av. Paulista, 1000, Bela Vista, São Paulo - SP" className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"></textarea>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'hours' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-blue-50 p-4 rounded-2xl flex items-start gap-3 border border-blue-100">
                   <Clock className="text-blue-600 mt-0.5" size={18} />
                   <p className="text-xs text-blue-700 font-medium">Definir seus horários de funcionamento irá abrir/fechar automaticamente sua loja no WhatsApp e iFood.</p>
                </div>
                {['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'].map((day) => (
                  <div key={day} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-blue-600" defaultChecked />
                      <span className="text-sm font-bold text-slate-700 w-24">{day}</span>
                    </div>
                    <div className="flex items-center gap-3">
                       <input type="time" defaultValue="18:00" className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm" />
                       <span className="text-slate-400 font-bold">até</span>
                       <input type="time" defaultValue="23:30" className="px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-sm" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200 flex justify-end">
            <button className="flex items-center gap-2 bg-blue-600 text-white px-10 py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all">
              <Save size={18} />
              Salvar Todas as Alterações
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
