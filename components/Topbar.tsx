
import React from 'react';
import { Bell, Search, Menu, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface TopbarProps {
  toggleSidebar: () => void;
}

const Topbar: React.FC<TopbarProps> = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 z-10">
      <div className="flex items-center gap-4 flex-1">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-slate-50 rounded-lg lg:hidden"
        >
          <Menu size={20} className="text-slate-600" />
        </button>
        <div className="relative max-w-md w-full hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Buscar pedidos, clientes..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="relative p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>
        <div className="w-px h-6 bg-slate-200 mx-2"></div>
        <div 
          onClick={() => navigate('/profile')}
          className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 p-1.5 pr-3 rounded-lg transition-all"
        >
          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 font-bold text-sm">
            JB
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">Burguer do João</p>
            <p className="text-xs text-slate-500 mt-1 leading-none">Administrador</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;
