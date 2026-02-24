
import React, { useState } from 'react';
import { 
  Search, 
  User, 
  Plus, 
  Minus, 
  Trash2, 
  CreditCard, 
  Banknote,
  Navigation,
  Package,
  Utensils,
  Bike,
  Hash,
  ChevronLeft,
  CircleAlert
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ServiceType, PaymentMethod } from '../types';

const ManualOrder: React.FC = () => {
  const navigate = useNavigate();
  const [customerName, setCustomerName] = useState('');
  const [serviceType, setServiceType] = useState<ServiceType>(ServiceType.EAT_IN);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(PaymentMethod.MONEY);
  const [tableNumber, setTableNumber] = useState('');
  const [cart, setCart] = useState([
    { id: '1', name: 'Burguer Clássico', qty: 1, price: 12.00 }
  ]);

  const updateQty = (id: string, delta: number) => {
    setCart(prev => prev.map(item => 
      item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item
    ));
  };

  const removeItem = (id: string) => {
    setCart(prev => prev.filter(i => i.id !== id));
  };

  const subtotal = cart.reduce((acc, i) => acc + (i.price * i.qty), 0);
  
  // Taxa de entrega somente se for DELIVERY Manual
  const deliveryFee = serviceType === ServiceType.DELIVERY ? 7.00 : 0.00;
  // Taxa de embalagem somente se for PARA LEVAR
  const packagingFee = serviceType === ServiceType.TAKEAWAY ? 2.50 : 0.00;
  
  const total = subtotal + deliveryFee + packagingFee;

  return (
    <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex-1 space-y-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/orders')}
              className="p-2 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 text-slate-600 transition-all"
            >
              <ChevronLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-black text-slate-900 tracking-tight uppercase italic">Novo Lançamento</h1>
              <p className="text-slate-500 text-sm font-medium">Atendimento presencial e lançamentos rápidos.</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1 space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] block ml-1">Identificação do Cliente</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Nome para comanda..." 
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all" 
                />
              </div>
            </div>
            
            {serviceType === ServiceType.EAT_IN && (
              <div className="w-full md:w-32 space-y-2 animate-in zoom-in-95 duration-200">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] block ml-1">Mesa</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="Nº" 
                    className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-black focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:bg-white transition-all text-blue-600" 
                  />
                </div>
              </div>
            )}
          </div>

          <div className="space-y-4">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] block ml-1">Modalidade do Pedido</label>
             <div className="grid grid-cols-3 gap-4">
                {[
                  { id: ServiceType.EAT_IN, label: 'No Local', icon: Utensils, desc: 'Notar Mesa' },
                  { id: ServiceType.TAKEAWAY, label: 'Para Levar', icon: Package, desc: '+ Taxa Emb.' },
                  { id: ServiceType.DELIVERY, label: 'Entrega', icon: Bike, desc: '+ Taxa Entr.' },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setServiceType(type.id);
                      if (type.id !== ServiceType.EAT_IN) setTableNumber('');
                    }}
                    className={`flex flex-col items-center justify-center p-6 border-2 rounded-[24px] transition-all group ${serviceType === type.id ? 'border-blue-600 bg-blue-50/50 text-blue-600 shadow-xl shadow-blue-100' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200 hover:bg-white'}`}
                  >
                    <type.icon size={28} className={`mb-2 transition-transform ${serviceType === type.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                    <span className="text-[11px] font-black uppercase tracking-wider">{type.label}</span>
                    <span className="text-[9px] font-bold opacity-60 mt-0.5 uppercase italic">{type.desc}</span>
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[32px] border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Plus size={20} className="text-blue-600" />
              Adicionar Produtos
            </h2>
          </div>
          
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Pesquisar por nome ou categoria..." 
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all" 
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
             {[
               { id: 'p1', name: 'Hambúrguer Clássico', price: 12.00, cat: 'Salgados' },
               { id: 'p2', name: 'Refrigerante Lata', price: 5.50, cat: 'Bebidas' },
               { id: 'p3', name: 'Batata Frita P', price: 8.00, cat: 'Porções' }
             ].map((item, i) => (
               <div 
                 key={i} 
                 onClick={() => {
                   const existing = cart.find(c => c.id === item.id);
                   if (existing) updateQty(item.id, 1);
                   else setCart([...cart, { id: item.id, name: item.name, qty: 1, price: item.price }]);
                 }}
                 className="p-5 border border-slate-100 bg-slate-50 rounded-2xl flex items-center justify-between hover:border-blue-200 hover:bg-white cursor-pointer group transition-all"
               >
                 <div>
                   <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.cat}</p>
                   <p className="text-sm font-bold text-slate-900">{item.name}</p>
                   <p className="text-xs text-slate-500 font-black mt-1 italic">R$ {item.price.toFixed(2).replace('.', ',')}</p>
                 </div>
                 <div className="p-2 bg-white border border-slate-200 text-blue-600 rounded-xl shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <Plus size={18} />
                 </div>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="w-full lg:w-[420px] shrink-0">
        <div className="bg-white rounded-[32px] border border-slate-200 shadow-2xl overflow-hidden sticky top-6">
          <div className="p-8 border-b border-slate-200 bg-slate-50/50">
             <h2 className="text-xl font-black text-slate-900 tracking-tight italic uppercase">Fechamento</h2>
             <div className="flex items-center gap-2 mt-2">
               <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${serviceType === ServiceType.EAT_IN ? 'bg-emerald-100 text-emerald-700' : serviceType === ServiceType.TAKEAWAY ? 'bg-amber-100 text-amber-700' : 'bg-blue-100 text-blue-700'}`}>
                 {serviceType === ServiceType.EAT_IN ? (tableNumber ? `MESA ${tableNumber}` : 'Local') : serviceType === ServiceType.TAKEAWAY ? 'Para Levar' : 'Entrega'}
               </span>
             </div>
          </div>
          
          <div className="p-8 space-y-6 max-h-[350px] overflow-y-auto">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between items-start animate-in fade-in slide-in-from-right-2">
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-900">{item.name}</p>
                  <div className="flex items-center gap-3 mt-3">
                    <button onClick={() => updateQty(item.id, -1)} className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                      <Minus size={14} />
                    </button>
                    <span className="text-sm font-black text-slate-800 w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="p-1.5 bg-slate-100 text-slate-500 rounded-lg">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="text-sm font-black text-slate-900">R$ {(item.price * item.qty).toFixed(2).replace('.', ',')}</p>
                  <button onClick={() => removeItem(item.id)} className="mt-2 text-slate-300 hover:text-rose-500 transition-all">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-200 space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-slate-500 uppercase">
                <span>Itens</span>
                <span className="text-slate-900">R$ {subtotal.toFixed(2).replace('.', ',')}</span>
              </div>
              {packagingFee > 0 && (
                <div className="flex justify-between items-center text-xs font-bold text-amber-600 uppercase italic animate-in slide-in-from-bottom-2">
                  <span>Taxa de Embalagem</span>
                  <span>R$ {packagingFee.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              {deliveryFee > 0 && (
                <div className="flex justify-between items-center text-xs font-bold text-blue-600 uppercase italic animate-in slide-in-from-bottom-2">
                  <span>Taxa de Entrega</span>
                  <span>R$ {deliveryFee.toFixed(2).replace('.', ',')}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-4 border-t border-slate-200">
                <span className="text-lg font-black text-slate-900 tracking-tight italic">TOTAL</span>
                <span className="text-3xl font-black text-blue-600 tracking-tighter">R$ {total.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <div className="space-y-3">
               <div className="grid grid-cols-2 gap-3">
                 <button onClick={() => setPaymentMethod(PaymentMethod.MONEY)} className={`flex items-center gap-2 justify-center py-4 rounded-2xl text-xs font-black uppercase border-2 transition-all ${paymentMethod === PaymentMethod.MONEY ? 'border-blue-600 bg-white text-blue-600 shadow-xl' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                   <Banknote size={16} />
                   Dinheiro
                 </button>
                 <button onClick={() => setPaymentMethod(PaymentMethod.DEBIT)} className={`flex items-center gap-2 justify-center py-4 rounded-2xl text-xs font-black uppercase border-2 transition-all ${paymentMethod === PaymentMethod.DEBIT ? 'border-blue-600 bg-white text-blue-600 shadow-xl' : 'border-slate-100 bg-slate-50 text-slate-400'}`}>
                   <CreditCard size={16} />
                   Cartão/PIX
                 </button>
               </div>
            </div>

            <button 
              disabled={cart.length === 0}
              className="w-full py-5 bg-blue-600 text-white font-black text-sm uppercase rounded-[24px] shadow-2xl shadow-blue-200 hover:bg-blue-700 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
            >
              Lançar Pedido
              <Navigation size={20} className="rotate-90" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManualOrder;
