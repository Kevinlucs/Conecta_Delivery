
import React from 'react';
import { 
  BookOpen, 
  PlayCircle, 
  HelpCircle, 
  MessageCircle, 
  FileText, 
  ChevronRight,
  ExternalLink,
  Search
} from 'lucide-react';

const Help: React.FC = () => {
  const categories = [
    { title: 'Primeiros Passos', desc: 'Aprenda o básico para começar sua operação.', icon: PlayCircle, color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Integração iFood', desc: 'Como conectar e gerenciar seus pedidos do portal.', icon: ShoppingBagIcon, color: 'text-rose-600', bg: 'bg-rose-50' },
    { title: 'WhatsApp Business', desc: 'Dicas para otimizar seu chatbot e atendimento.', icon: MessageCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { title: 'Impressão & Hardware', desc: 'Configurando sua impressora térmica de 80mm.', icon: PrinterIcon, color: 'text-slate-600', bg: 'bg-slate-100' },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Central de Ajuda & Suporte</h1>
        <p className="text-slate-500 max-w-xl mx-auto font-medium">Tudo o que você precisa para dominar o Conecta Delivery e escalar suas vendas.</p>
        
        <div className="relative max-w-2xl mx-auto pt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 mt-2" size={20} />
          <input 
            type="text" 
            placeholder="Como integrar o iFood? Como imprimir comandas?" 
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-all cursor-pointer group">
            <div className={`w-12 h-12 rounded-2xl ${cat.bg} ${cat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <cat.icon size={24} />
            </div>
            <h3 className="font-bold text-slate-900 mb-2">{cat.title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{cat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <BookOpen size={20} className="text-blue-600" />
              Artigos Recomendados
            </h2>
            <button className="text-sm font-bold text-blue-600 hover:underline">Ver base de conhecimento</button>
          </div>
          
          <div className="space-y-4">
            {[
              { title: 'Como configurar a confirmação automática do iFood', readTime: '3 min', category: 'Integrações' },
              { title: 'Melhores práticas para seu Cardápio no WhatsApp', readTime: '5 min', category: 'Vendas' },
              { title: 'Entendendo os relatórios de faturamento', readTime: '4 min', category: 'Métricas' },
              { title: 'Como adicionar múltiplos operadores na conta', readTime: '2 min', category: 'Gestão' },
            ].map((article, i) => (
              <div key={i} className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl hover:border-blue-200 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 group-hover:text-blue-700 transition-colors">{article.title}</h4>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{article.category}</span>
                      <span className="w-1 h-1 bg-slate-200 rounded-full"></span>
                      <span className="text-[10px] font-medium text-slate-400">{article.readTime} de leitura</span>
                    </div>
                  </div>
                </div>
                <ChevronRight size={18} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <HelpCircle size={20} className="text-blue-600" />
            Precisa de Suporte?
          </h2>
          <div className="bg-blue-600 rounded-3xl p-6 text-white space-y-6 relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-sm font-medium opacity-90 leading-relaxed">Nossa equipe de especialistas está pronta para ajudar você a configurar sua operação em tempo recorde.</p>
              
              <div className="space-y-4 mt-8">
                <button className="w-full flex items-center justify-between bg-white text-blue-600 p-4 rounded-2xl font-bold text-sm hover:bg-slate-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <MessageCircle size={20} />
                    Suporte via WhatsApp
                  </div>
                  <ExternalLink size={16} />
                </button>
                <button className="w-full flex items-center justify-between bg-blue-500 text-white p-4 rounded-2xl font-bold text-sm hover:bg-blue-400 transition-colors border border-blue-400">
                  <div className="flex items-center gap-3">
                    <HelpCircle size={20} />
                    Abrir Chamado
                  </div>
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
            {/* Elemento decorativo */}
            <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          </div>
          
          <div className="bg-emerald-50 border border-emerald-100 p-5 rounded-2xl text-center">
            <p className="text-[11px] font-bold text-emerald-700 uppercase tracking-widest mb-1">Status do Sistema</p>
            <p className="text-xs font-semibold text-emerald-600 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
              Todos os sistemas operacionais
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock Icons for category mapping
const ShoppingBagIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
);

const PrinterIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect width="12" height="8" x="6" y="14"/></svg>
);

export default Help;
